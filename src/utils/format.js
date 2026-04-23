export const currency = (n, code = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0
    }).format(n)
  } catch {
    return `$${n}`
  }
}

export const whatsappNumber = '447555757615' // +44 7555 757615 (no spaces for wa.me)
export const whatsappDisplay = '+44 7555 757615'

export const buildWhatsAppLink = (product, opts = {}) => {
  const { size, color } = opts
  const lines = [
    `Hello 0528creatives, I would like to order:`,
    ``,
    `Item: ${product.name}`,
    product.brand && `Brand: ${product.brand}`,
    color && `Colour: ${color}`,
    size && `Size: ${size}`,
    `Price: ${currency(product.price)}`,
    `Ref: ${product.id}`
  ].filter(Boolean)
  const msg = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}

export const buildGeneralWhatsAppLink = () => {
  const msg = encodeURIComponent('Hello 0528creatives, I have a question.')
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}
