export const currency = (n, code = 'GBP') => {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0
    }).format(n)
  } catch {
    return `£${n}`
  }
}

export const whatsappNumber = '447555757615' // +44 7555 757615 (no spaces for wa.me)
export const whatsappDisplay = '+44 7555 757615'

export const buildWhatsAppLink = (product, opts = {}) => {
  const { size, color, qty = 1 } = opts
  const lines = [
    `Hello 0528creatives, I would like to order:`,
    ``,
    `Item: ${product.name}`,
    product.brand && `Brand: ${product.brand}`,
    color && `Colour: ${color}`,
    size && `Size: ${size}`,
    qty > 1 && `Quantity: ${qty}`,
    `Price: ${currency(product.price)}`,
    `Ref: ${product.id}`
  ].filter(Boolean)
  const msg = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}

// Used by the cart "Pay via WhatsApp" CTA — bundles every line item.
export const buildCartWhatsAppLink = (items) => {
  if (!items?.length) return buildGeneralWhatsAppLink()
  const total = items.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0)
  const lineRows = items.map((it, i) => {
    const parts = [
      `${i + 1}. ${it.name}`,
      it.brand && `   Brand: ${it.brand}`,
      it.color && `   Colour: ${it.color}`,
      it.size && `   Size: ${it.size}`,
      `   Qty: ${it.qty || 1}`,
      `   Price: ${currency(it.price)}`,
      `   Ref: ${it.id}`
    ].filter(Boolean)
    return parts.join('\n')
  }).join('\n\n')

  const lines = [
    `Hello 0528creatives, I would like to order the following:`,
    ``,
    lineRows,
    ``,
    `Total: ${currency(total)}`,
    ``,
    `Please confirm payment details and dispatch.`
  ]
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`
}

export const buildGeneralWhatsAppLink = () => {
  const msg = encodeURIComponent('Hello 0528creatives, I have a question.')
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}
