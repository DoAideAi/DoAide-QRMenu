import { themes } from '../data/themes';

function VegBadge({ isVeg }) {
  const color = isVeg ? '#22c55e' : '#ef4444';
  return (
    <span
      style={{
        display: 'inline-block',
        width: '14px',
        height: '14px',
        border: `2px solid ${color}`,
        borderRadius: '3px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: 'block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </span>
  );
}

export default function MenuViewer({ menuData }) {
  const theme = themes.find(th => th.id === menuData.themeId) || themes[0];

  return (
    <div
      style={{
        fontFamily: theme.fontFamily,
        background: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <div style={{ background: theme.headerBg, padding: '24px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.accent, margin: 0 }}>
          {menuData.restaurantName}
        </h1>
      </div>

      {menuData.showSpecialOffer && menuData.specialOffer && (
        <div style={{
          background: theme.accent,
          color: theme.priceText,
          padding: '10px 16px',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '14px',
        }}>
          ⭐ {menuData.specialOffer}
        </div>
      )}

      <div style={{ padding: '16px' }}>
        {menuData.categories.map(cat => (
          <div key={cat.id} style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 700,
              padding: '10px 16px',
              margin: '0 0 12px 0',
              background: theme.categoryBg,
              borderRadius: '8px',
              color: theme.accent,
            }}>
              {cat.name}
            </h2>

            {cat.items.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 16px',
                  background: theme.cardBg,
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <VegBadge isVeg={item.isVeg} />
                    <span style={{ fontWeight: 600, fontSize: '15px' }}>{item.name}</span>
                    {item.spicyLevel > 0 && (
                      <span style={{ fontSize: '12px' }}>{'🌶️'.repeat(item.spicyLevel)}</span>
                    )}
                  </div>
                  {item.description && (
                    <p style={{ fontSize: '13px', opacity: 0.7, margin: 0 }}>{item.description}</p>
                  )}
                </div>
                <span style={{
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: theme.priceBg,
                  color: theme.priceText,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '16px', fontSize: '12px' }}>
        <span style={{
          display: 'inline-block',
          background: `${theme.accent}15`,
          border: `1px solid ${theme.accent}30`,
          borderRadius: '999px',
          padding: '4px 12px',
          fontSize: '10px',
          fontWeight: 500,
          color: theme.accent,
          marginBottom: '4px',
        }}>A DoAide Product</span>
        <br />
        <a href="https://doaide.com" style={{ color: theme.accent, opacity: 0.6 }} target="_blank" rel="noopener noreferrer">doaide.com</a>
      </div>
    </div>
  );
}
