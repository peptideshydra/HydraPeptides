import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X, Plus, Trash2 } from 'lucide-react'
import { supabase, type ProductRow, type ProductDetailRow, type Variation, type VialOption } from '../../lib/supabase'

const CATEGORIES = ['All Peptides', 'Tablets', 'Cosmetics and Topicals']

type FormVialOption = Omit<VialOption, 'price'> & { price: number | string }
type FormVariation = Omit<Variation, 'vials'> & { vials: FormVialOption[] }
const emptyVial: FormVialOption = { label: '', price: '', discount: null, in_stock: true }
const emptyVariation: FormVariation = { dosage: '', vials: [{ ...emptyVial }] }

interface FormData {
  name: string
  slug: string
  dosage: string
  price: string
  old_price: string
  sale_badge: string
  tag: string
  tested: boolean
  image: string
  category: string
  rating: string
  review_count: string
  price_per_unit: string
  in_stock: boolean
  featured: boolean
  is_new: boolean
  is_bestseller: boolean
  show_in_shop: boolean
  sort_order: string
  variations: FormVariation[]
}

function toNum(s: string): number {
  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}

interface DetailsData {
  research_purpose: string
  ingredients: string
  packaging_contents: string
  molecular_structure: string
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function getStorageUrl(path: string) {
  const url = import.meta.env.VITE_SUPABASE_URL as string
  return `${url}/storage/v1/object/public/product-images/${path}`
}

const inputBaseClass = 'w-full h-10 px-3 rounded-lg bg-[#0f1117] border border-[#2a2d37] text-white font-primary text-[14px] outline-none focus:border-[#16A1C5] transition-colors disabled:opacity-50'
const noSpinnerClass = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

function Input({ label, type, className = '', ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const isNumber = type === 'number'
  return (
    <div>
      <label className="block text-[12px] text-[#6B7785] mb-1 font-primary">{label}</label>
      <input
        type={type}
        {...props}
        className={`${inputBaseClass} ${isNumber ? noSpinnerClass : ''} ${className}`}
      />
    </div>
  )
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-[12px] text-[#6B7785] mb-1 font-primary">{label}</label>
      <textarea
        {...props}
        className="w-full px-3 py-2 rounded-lg bg-[#0f1117] border border-[#2a2d37] text-white font-primary text-[14px] outline-none focus:border-[#16A1C5] transition-colors resize-y min-h-[120px]"
      />
    </div>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-[#16A1C5]' : 'bg-[#2a2d37]'}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </div>
      <span className="text-[13px] text-[#9ca3af] font-primary group-hover:text-white transition-colors">{label}</span>
    </label>
  )
}

export default function AdminProductEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const [form, setForm] = useState<FormData>({
    name: '', slug: '', dosage: '', price: '', old_price: '', sale_badge: '', tag: '',
    tested: false, image: '', category: 'All Peptides', rating: '5', review_count: '0',
    price_per_unit: '', in_stock: true, featured: false, is_new: false, is_bestseller: false,
    show_in_shop: true, sort_order: '0', variations: [],
  })

  const [details, setDetails] = useState<DetailsData>({
    research_purpose: '', ingredients: '', packaging_contents: '', molecular_structure: '',
  })

  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProduct = useCallback(async () => {
    if (isNew || !id) return
    setLoading(true)

    const { data: p } = await supabase.from('products').select('*').eq('id', id).single()
    if (p) {
      const prod = p as ProductRow
      setForm({
        name: prod.name, slug: prod.slug, dosage: prod.dosage ?? '', price: String(prod.price ?? ''),
        old_price: prod.old_price != null ? String(prod.old_price) : '', sale_badge: prod.sale_badge ?? '', tag: prod.tag ?? '',
        tested: prod.tested, image: prod.image, category: prod.category,
        rating: String(prod.rating ?? '5'), review_count: String(prod.review_count ?? '0'), price_per_unit: prod.price_per_unit ?? '',
        in_stock: prod.in_stock, featured: prod.featured, is_new: prod.is_new,
        is_bestseller: prod.is_bestseller, show_in_shop: prod.show_in_shop,
        sort_order: String(prod.sort_order ?? '0'),
        variations: (prod.variations ?? []).map((v: Variation) => ({
          ...v,
          vials: v.vials.map((vial) => ({ ...vial, price: String(vial.price) })),
        })),
      })
    }

    const { data: d } = await supabase.from('product_details').select('*').eq('product_id', id).single()
    if (d) {
      const det = d as ProductDetailRow
      setDetailsId(det.id)
      setDetails({
        research_purpose: det.research_purpose ?? '',
        ingredients: det.ingredients ?? '',
        packaging_contents: det.packaging_contents ?? '',
        molecular_structure: det.molecular_structure ?? '',
      })
    }

    setLoading(false)
  }, [id, isNew])

  useEffect(() => { loadProduct() }, [loadProduct])

  function update<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  function updateDetail<K extends keyof DetailsData>(key: K, val: string) {
    setDetails((prev) => ({ ...prev, [key]: val }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadErr } = await supabase.storage.from('product-images').upload(path, file)
    setUploading(false)
    if (uploadErr) {
      setError(uploadErr.message)
      return
    }
    update('image', getStorageUrl(path))
  }

  async function handleSave() {
    if (!form.name || !form.slug || !form.image) {
      setError('Name, slug, and image are required.')
      return
    }
    setSaving(true)
    setError(null)

    const productPayload = {
      name: form.name,
      slug: form.slug,
      dosage: form.dosage || null,
      price: toNum(form.price),
      old_price: form.old_price ? toNum(form.old_price) : null,
      sale_badge: form.sale_badge || null,
      tag: form.tag || null,
      tested: form.tested,
      image: form.image,
      category: form.category,
      rating: toNum(form.rating),
      review_count: toNum(form.review_count),
      price_per_unit: form.price_per_unit || null,
      in_stock: form.in_stock,
      featured: form.featured,
      is_new: form.is_new,
      is_bestseller: form.is_bestseller,
      show_in_shop: form.show_in_shop,
      sort_order: toNum(form.sort_order),
      variations: form.variations.map((v) => ({
        ...v,
        vials: v.vials.map((vial) => ({ ...vial, price: typeof vial.price === 'string' ? toNum(vial.price) : vial.price })),
      })),
    }

    let productId = id

    if (isNew) {
      const { data, error: insErr } = await supabase.from('products').insert(productPayload).select().single()
      if (insErr || !data) {
        setError(insErr?.message ?? 'Failed to create product')
        setSaving(false)
        return
      }
      productId = data.id
    } else {
      const { error: updErr } = await supabase.from('products').update(productPayload).eq('id', id!)
      if (updErr) {
        setError(updErr.message)
        setSaving(false)
        return
      }
    }

    const detailsPayload = {
      product_id: productId!,
      research_purpose: details.research_purpose || null,
      ingredients: details.ingredients || null,
      packaging_contents: details.packaging_contents || null,
      molecular_structure: details.molecular_structure || null,
    }

    if (detailsId) {
      await supabase.from('product_details').update(detailsPayload).eq('id', detailsId)
    } else {
      await supabase.from('product_details').insert(detailsPayload)
    }

    setSaving(false)
    navigate('/admin')
  }

  // ─── Variations helpers ──────────────────────────────────────────────
  function addVariation() {
    update('variations', [...form.variations, { ...emptyVariation, vials: [{ ...emptyVial }] }])
  }
  function removeVariation(vi: number) {
    update('variations', form.variations.filter((_, i) => i !== vi))
  }
  function updateVariationDosage(vi: number, dosage: string) {
    const v = [...form.variations]
    v[vi] = { ...v[vi], dosage }
    update('variations', v)
  }
  function addVial(vi: number) {
    const v = [...form.variations]
    v[vi] = { ...v[vi], vials: [...v[vi].vials, { ...emptyVial }] }
    update('variations', v)
  }
  function removeVial(vi: number, vii: number) {
    const v = [...form.variations]
    v[vi] = { ...v[vi], vials: v[vi].vials.filter((_, i) => i !== vii) }
    update('variations', v)
  }
  function updateVial(vi: number, vii: number, key: keyof FormVialOption, val: string | number | boolean | null) {
    const v = [...form.variations]
    const vials = [...v[vi].vials]
    vials[vii] = { ...vials[vii], [key]: val }
    v[vi] = { ...v[vi], vials }
    update('variations', v)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-[900px]">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin')} className="p-2 rounded-lg text-[#6B7785] hover:text-white hover:bg-[#1a1d27] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[22px] font-bold text-white font-primary flex-1">
          {isNew ? 'New Product' : `Edit: ${form.name}`}
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Product'}
        </button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] font-primary">{error}</div>
      )}

      {/* ─── Basic info ─── */}
      <section className="bg-[#1a1d27] rounded-xl border border-[#2a2d37] p-6 mb-6">
        <h2 className="text-[16px] font-semibold text-white font-primary mb-5">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Product Name" value={form.name} onChange={(e) => {
            const name = (e.target as HTMLInputElement).value
            update('name', name)
            if (isNew) update('slug', slugify(name))
          }} />
          <Input label="Slug" value={form.slug} onChange={(e) => update('slug', (e.target as HTMLInputElement).value)} />
          <Input label="Dosage" placeholder="e.g. 10 mg" value={form.dosage} onChange={(e) => update('dosage', (e.target as HTMLInputElement).value)} />
          <div>
            <label className="block text-[12px] text-[#6B7785] mb-1 font-primary">Category</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#0f1117] border border-[#2a2d37] text-white font-primary text-[14px] outline-none focus:border-[#16A1C5]"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Price ($)" type="number" step="0.01" value={form.price} onChange={(e) => update('price', (e.target as HTMLInputElement).value)} />
          <Input label="Old Price ($)" type="number" step="0.01" value={form.old_price} onChange={(e) => update('old_price', (e.target as HTMLInputElement).value)} />
          <Input label="Sale Badge" placeholder="e.g. 17% OFF" value={form.sale_badge} onChange={(e) => update('sale_badge', (e.target as HTMLInputElement).value)} />
          <Input label="Tag" placeholder="e.g. New" value={form.tag} onChange={(e) => update('tag', (e.target as HTMLInputElement).value)} />
          <Input label="Price per unit" placeholder="e.g. 5.06 €/1mg" value={form.price_per_unit} onChange={(e) => update('price_per_unit', (e.target as HTMLInputElement).value)} />
          <Input label="Sort Order" type="number" value={form.sort_order} onChange={(e) => update('sort_order', (e.target as HTMLInputElement).value)} />
          <Input label="Rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update('rating', (e.target as HTMLInputElement).value)} />
          <Input label="Review Count" type="number" value={form.review_count} onChange={(e) => update('review_count', (e.target as HTMLInputElement).value)} />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5">
          <Toggle label="In Stock" checked={form.in_stock} onChange={(v) => update('in_stock', v)} />
          <Toggle label="Featured" checked={form.featured} onChange={(v) => update('featured', v)} />
          <Toggle label="New" checked={form.is_new} onChange={(v) => update('is_new', v)} />
          <Toggle label="Bestseller" checked={form.is_bestseller} onChange={(v) => update('is_bestseller', v)} />
          <Toggle label="Show in Shop" checked={form.show_in_shop} onChange={(v) => update('show_in_shop', v)} />
          <Toggle label="Tested" checked={form.tested} onChange={(v) => update('tested', v)} />
        </div>
      </section>

      {/* ─── Image ─── */}
      <section className="bg-[#1a1d27] rounded-xl border border-[#2a2d37] p-6 mb-6">
        <h2 className="text-[16px] font-semibold text-white font-primary mb-5">Product Image</h2>
        <div className="flex items-start gap-6">
          {form.image && (
            <div className="relative">
              <img src={form.image} alt="" className="w-32 h-32 rounded-xl object-cover bg-[#0f1117]" />
              <button
                onClick={() => update('image', '')}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div>
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2a2d37] text-[#9ca3af] hover:text-white cursor-pointer transition-colors font-primary text-[14px]">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading…' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <p className="text-[11px] text-[#6B7785] mt-2 font-primary">Or paste a URL below:</p>
            <input
              type="text"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="https://..."
              className="mt-1 w-[300px] h-9 px-3 rounded-lg bg-[#0f1117] border border-[#2a2d37] text-white font-primary text-[13px] outline-none focus:border-[#16A1C5]"
            />
          </div>
        </div>
      </section>

      {/* ─── Variations ─── */}
      <section className="bg-[#1a1d27] rounded-xl border border-[#2a2d37] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-semibold text-white font-primary">Variations</h2>
          <button onClick={addVariation} className="flex items-center gap-1.5 text-[13px] text-[#16A1C5] hover:text-white font-primary transition-colors">
            <Plus className="w-4 h-4" /> Add Variation
          </button>
        </div>

        {form.variations.length === 0 && (
          <p className="text-[13px] text-[#6B7785] font-primary">No variations. Product will use base price.</p>
        )}

        {form.variations.map((variation, vi) => (
          <div key={vi} className="mb-5 p-4 rounded-lg bg-[#0f1117] border border-[#2a2d37]">
            <div className="flex items-center gap-3 mb-4">
              <Input label="Dosage" value={variation.dosage} onChange={(e) => updateVariationDosage(vi, (e.target as HTMLInputElement).value)} />
              <button onClick={() => removeVariation(vi)} className="p-2 mt-4 text-[#6B7785] hover:text-red-400" title="Remove variation">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {variation.vials.map((vial, vii) => (
                <div key={vii} className="flex items-center gap-3">
                  <input placeholder="Label (e.g. 1 Vial)" value={vial.label}
                    onChange={(e) => updateVial(vi, vii, 'label', e.target.value)}
                    className="flex-1 h-9 px-3 rounded-lg bg-[#1a1d27] border border-[#2a2d37] text-white font-primary text-[13px] outline-none focus:border-[#16A1C5]" />
                  <input placeholder="Price" type="number" step="0.01" value={vial.price}
                    onChange={(e) => updateVial(vi, vii, 'price', e.target.value)}
                    className={`w-24 h-9 px-3 rounded-lg bg-[#1a1d27] border border-[#2a2d37] text-white font-primary text-[13px] outline-none focus:border-[#16A1C5] ${noSpinnerClass}`} />
                  <input placeholder="Discount" value={vial.discount ?? ''}
                    onChange={(e) => updateVial(vi, vii, 'discount', e.target.value || null)}
                    className="w-20 h-9 px-3 rounded-lg bg-[#1a1d27] border border-[#2a2d37] text-white font-primary text-[13px] outline-none focus:border-[#16A1C5]" />
                  <Toggle label="" checked={vial.in_stock} onChange={(v) => updateVial(vi, vii, 'in_stock', v)} />
                  <button onClick={() => removeVial(vi, vii)} className="p-1.5 text-[#6B7785] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
              <button onClick={() => addVial(vi)} className="text-[12px] text-[#16A1C5] hover:text-white font-primary transition-colors mt-1">
                + Add Vial
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Product Details (accordion content) ─── */}
      <section className="bg-[#1a1d27] rounded-xl border border-[#2a2d37] p-6 mb-6">
        <h2 className="text-[16px] font-semibold text-white font-primary mb-5">Product Details (HTML)</h2>
        <div className="space-y-4">
          <Textarea label="Research Purpose" rows={5} value={details.research_purpose} onChange={(e) => updateDetail('research_purpose', e.target.value)} />
          <Textarea label="Ingredients" rows={5} value={details.ingredients} onChange={(e) => updateDetail('ingredients', e.target.value)} />
          <Textarea label="Packaging Contents" rows={5} value={details.packaging_contents} onChange={(e) => updateDetail('packaging_contents', e.target.value)} />
          <Textarea label="Molecular Structure" rows={5} value={details.molecular_structure} onChange={(e) => updateDetail('molecular_structure', e.target.value)} />
        </div>
      </section>

      {/* Bottom save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Product'}
        </button>
      </div>
    </div>
  )
}
