import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const SPICY_LABELS = { en: ['None', 'Mild', 'Medium', 'Hot', 'Extra Hot'], hi: ['कोई नहीं', 'हल्का', 'मध्यम', 'तीखा', 'बहुत तीखा'] };

export default function MenuBuilder({ menuData, setMenuData, t, lang }) {
  const updateField = (field, value) => setMenuData(prev => ({ ...prev, [field]: value }));

  const addCategory = () => {
    const name = lang === 'hi' ? 'नई श्रेणी' : 'New Category';
    setMenuData(prev => ({
      ...prev,
      categories: [...prev.categories, { id: crypto.randomUUID(), name, items: [] }],
    }));
  };

  const removeCategory = (catId) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== catId),
    }));
  };

  const updateCategory = (catId, name) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(c => c.id === catId ? { ...c, name } : c),
    }));
  };

  const addItem = (catId) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId
          ? {
              ...c,
              items: [...c.items, {
                id: crypto.randomUUID(),
                name: '',
                price: 0,
                description: '',
                isVeg: true,
                spicyLevel: 0,
                imageUrl: '',
              }],
            }
          : c
      ),
    }));
  };

  const removeItem = (catId, itemId) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c
      ),
    }));
  };

  const updateItem = (catId, itemId, field, value) => {
    setMenuData(prev => ({
      ...prev,
      categories: prev.categories.map(c =>
        c.id === catId
          ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
          : c
      ),
    }));
  };

  const moveCategory = (index, direction) => {
    setMenuData(prev => {
      const cats = [...prev.categories];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= cats.length) return prev;
      [cats[index], cats[newIndex]] = [cats[newIndex], cats[index]];
      return { ...prev, categories: cats };
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{t.restaurantName}</label>
        <input
          type="text"
          value={menuData.restaurantName}
          onChange={e => updateField('restaurantName', e.target.value)}
          placeholder={t.restaurantNamePlaceholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
        />
      </div>

      <ThemeSelector
        selectedTheme={menuData.themeId}
        onSelectTheme={id => updateField('themeId', id)}
        t={t}
        lang={lang}
      />

      <div className="border border-gray-200 rounded-lg p-3 bg-teal-50/50">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={menuData.showSpecialOffer}
            onChange={e => updateField('showSpecialOffer', e.target.checked)}
            className="w-4 h-4 accent-brand"
          />
          <span className="text-sm font-semibold text-gray-700">{t.enableSpecialOffer}</span>
        </label>
        {menuData.showSpecialOffer && (
          <input
            type="text"
            value={menuData.specialOffer}
            onChange={e => updateField('specialOffer', e.target.value)}
            placeholder={t.specialOfferPlaceholder}
            className="w-full mt-2 px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">{t.categories}</h3>
          <button
            onClick={addCategory}
            className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t.addCategory}
          </button>
        </div>

        <div className="space-y-3">
          {menuData.categories.map((category, catIndex) => (
            <CategoryCard
              key={category.id}
              category={category}
              catIndex={catIndex}
              totalCategories={menuData.categories.length}
              onUpdateCategory={updateCategory}
              onRemoveCategory={removeCategory}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
              onMoveCategory={moveCategory}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, catIndex, totalCategories, onUpdateCategory, onRemoveCategory, onAddItem, onRemoveItem, onUpdateItem, onMoveCategory, t, lang }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={category.name}
          onChange={e => onUpdateCategory(category.id, e.target.value)}
          className="flex-1 px-2 py-1 text-sm font-semibold bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-brand/50 rounded"
        />
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMoveCategory(catIndex, -1)}
            disabled={catIndex === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveCategory(catIndex, 1)}
            disabled={catIndex === totalCategories - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemoveCategory(category.id)}
            className="p-1 text-red-400 hover:text-red-600"
            title={t.deleteCategory}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-2 space-y-2">
        {category.items.map(item => (
          <ItemRow
            key={item.id}
            item={item}
            catId={category.id}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
            t={t}
            lang={lang}
          />
        ))}

        <button
          onClick={() => onAddItem(category.id)}
          className="w-full py-2 text-sm text-brand hover:text-brand-dark hover:bg-teal-50 rounded-lg border border-dashed border-brand/40 transition-colors flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.addItem}
        </button>
      </div>
    </div>
  );
}

function ItemRow({ item, catId, onRemoveItem, onUpdateItem, t, lang }) {
  const spicyLabels = SPICY_LABELS[lang] || SPICY_LABELS.en;

  return (
    <div className="border border-gray-100 rounded-lg p-2.5 bg-gray-50/50 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={item.name}
          onChange={e => onUpdateItem(catId, item.id, 'name', e.target.value)}
          placeholder={t.itemName}
          className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand/50"
        />
        <input
          type="number"
          value={item.price || ''}
          onChange={e => onUpdateItem(catId, item.id, 'price', Number(e.target.value))}
          placeholder={t.price}
          className="w-24 px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand/50"
          min="0"
        />
      </div>

      <input
        type="text"
        value={item.description}
        onChange={e => onUpdateItem(catId, item.id, 'description', e.target.value)}
        placeholder={t.description}
        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand/50"
      />

      <input
        type="text"
        value={item.imageUrl}
        onChange={e => onUpdateItem(catId, item.id, 'imageUrl', e.target.value)}
        placeholder={t.imageUrl}
        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand/50"
      />

      <div className="flex items-center gap-3 flex-wrap">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            checked={item.isVeg}
            onChange={() => onUpdateItem(catId, item.id, 'isVeg', true)}
            className="accent-green-500"
          />
          <span className="text-xs font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 border-2 border-green-500 rounded-sm relative">
              <span className="absolute inset-0.5 bg-green-500 rounded-full" />
            </span>
            {t.veg}
          </span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            checked={!item.isVeg}
            onChange={() => onUpdateItem(catId, item.id, 'isVeg', false)}
            className="accent-red-500"
          />
          <span className="text-xs font-medium flex items-center gap-1">
            <span className="inline-block w-3 h-3 border-2 border-red-500 rounded-sm relative">
              <span className="absolute inset-0.5 bg-red-500 rounded-full" />
            </span>
            {t.nonVeg}
          </span>
        </label>

        <select
          value={item.spicyLevel}
          onChange={e => onUpdateItem(catId, item.id, 'spicyLevel', Number(e.target.value))}
          className="text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand/50"
        >
          {spicyLabels.map((label, i) => (
            <option key={i} value={i}>{i > 0 ? '🌶️'.repeat(i) + ' ' : ''}{label}</option>
          ))}
        </select>

        <button
          onClick={() => onRemoveItem(catId, item.id)}
          className="ml-auto text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" />
          {t.deleteItem}
        </button>
      </div>
    </div>
  );
}
