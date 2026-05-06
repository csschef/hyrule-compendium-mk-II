import { useState, useEffect } from 'react'
import './ItemForm.css'
import { getAll } from '../api/dataApi'
import FormField from './FormField'
import CustomSelect from './CustomSelect'
import TagSelector from './TagSelector'

const REGIONS = [
  'Hyrule Field', 'Necluda', 'Gerudo Desert', 'Hebra Mountains',
  'Eldin Canyon', 'Lanayru Great Spring', 'Akkala Highlands', 'Faron Grasslands',
  'Sky Islands', 'The Depths'
]

const EFFECTS = [
  { value: '', label: 'None' },
  { value: 'stamina recovery', label: 'Stamina Recovery' },
  { value: 'heat resistance', label: 'Heat Resistance' },
  { value: 'cold resistance', label: 'Cold Resistance' },
  { value: 'shock resistance', label: 'Shock Resistance' },
  { value: 'attack up', label: 'Attack Up' },
  { value: 'defense up', label: 'Defense Up' },
  { value: 'stealth up', label: 'Stealth Up' },
  { value: 'extra hearts', label: 'Extra Hearts' },
]

export default function ItemForm({ initialData = {}, onSave, onCancel, isCreate = false, game }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    category: initialData.category || 'monsters',
    description: initialData.description || '',
    common_locations: initialData.common_locations || [],
    drops: initialData.drops || [],
    attack: initialData.properties?.attack ?? '',
    defense: initialData.properties?.defense ?? '',
    edible: initialData.edible ?? false,
    hearts_recovered: initialData.hearts_recovered ?? '',
    cooking_effect: initialData.cooking_effect || '',
    // Empty in create mode, keep existing on edit
    image: isCreate ? '' : (initialData.image || ''),
  })

  const [availableDrops, setAvailableDrops] = useState([])

  // Fetch available drops from API
  useEffect(() => {
    if (game) {
      getAll(game)
        .then(data => {
          const dropsSet = new Set()
          data.forEach(item => {
            if (Array.isArray(item.drops)) {
              item.drops.forEach(d => {
                // Skip corrupted entries where multiple drops are concatenated
                if (typeof d === 'string' && d.length <= 40) {
                  dropsSet.add(d.toLowerCase())
                }
              })
            }
          })
          setAvailableDrops(Array.from(dropsSet).sort())
        })
        .catch(err => console.error('Could not load drops:', err))
    }
  }, [game])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Add a location tag from dropdown
  const handleLocationAdd = (e) => {
    const val = e.target.value
    if (val && !form.common_locations.includes(val)) {
      setForm(prev => ({ ...prev, common_locations: [...prev.common_locations, val] }))
    }
    e.target.value = ''
  }

  const removeLocation = (loc) => {
    setForm(prev => ({
      ...prev,
      common_locations: prev.common_locations.filter(l => l !== loc)
    }))
  }

  // Add a drop tag from dropdown
  const handleDropAdd = (e) => {
    const val = e.target.value
    if (val && !form.drops.includes(val)) {
      setForm(prev => ({ ...prev, drops: [...prev.drops, val] }))
    }
    e.target.value = ''
  }

  const removeDrop = (drop) => {
    setForm(prev => ({
      ...prev,
      drops: prev.drops.filter(d => d !== drop)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = {
      name: form.name,
      category: form.category,
      description: form.description,
      common_locations: form.common_locations,
      drops: form.drops,
      image: form.image
    }

    if (form.category === 'equipment') {
      result.properties = {
        attack: Number(form.attack) || 0,
        defense: Number(form.defense) || 0
      }
    } else if (form.category === 'materials') {
      result.hearts_recovered = Number(form.hearts_recovered) || 0
      result.cooking_effect = form.cooking_effect
    } else if (form.category === 'creatures') {
      result.edible = form.edible === 'true' || form.edible === true
      if (result.edible) {
        result.hearts_recovered = Number(form.hearts_recovered) || 0
        result.cooking_effect = form.cooking_effect
      }
    }

    onSave(result)
  }

  const { category } = form

  return (
    <form className="edit-form" onSubmit={handleSubmit}>

      {isCreate && (
        <FormField icon="mdi-tag" label="Category">
          <CustomSelect 
            name="category" 
            value={form.category} 
            onChange={handleChange}
            options={[
              {value: 'monsters', label: 'Monsters'},
              {value: 'equipment', label: 'Equipment'},
              {value: 'materials', label: 'Materials'},
              {value: 'creatures', label: 'Creatures'},
              {value: 'treasure', label: 'Treasure'}
            ]}
          />
        </FormField>
      )}

      <FormField icon="mdi-format-title" label="Name">
        <input required className="edit-input" name="name" value={form.name} onChange={handleChange} aria-label="Name" />
      </FormField>

      <FormField icon="mdi-image" label="Image URL (Optional)">
        <input
          className="edit-input"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </FormField>

      <FormField icon="mdi-text" label="Description">
        <textarea required className="edit-input edit-textarea" name="description" value={form.description} onChange={handleChange} rows={4} />
      </FormField>

      {/* Equipment: Attack & Defense */}
      {category === 'equipment' && (
        <div className="form-row">
          <FormField icon="mdi-sword" label="Attack">
            <input className="edit-input" type="number" name="attack" value={form.attack} onChange={handleChange} aria-label="Attack" />
          </FormField>
          <FormField icon="mdi-shield-half-full" label="Defense">
            <input className="edit-input" type="number" name="defense" value={form.defense} onChange={handleChange} aria-label="Defense" />
          </FormField>
        </div>
      )}

      {/* Creatures: Edible */}
      {category === 'creatures' && (
        <FormField icon="mdi-pot-mix" label="Edible">
          <CustomSelect 
            name="edible" 
            value={String(form.edible)} 
            onChange={handleChange}
            options={[
              {value: 'true', label: 'Yes'},
              {value: 'false', label: 'No'}
            ]}
          />
        </FormField>
      )}

      {/* Hearts & Cooking */}
      {((category === 'creatures' && (form.edible === 'true' || form.edible === true)) || category === 'materials') && (
        <div className="form-row">
          <FormField icon="mdi-heart" label="Hearts Recovered">
            <input className="edit-input" type="number" step="0.5" name="hearts_recovered" value={form.hearts_recovered} onChange={handleChange} aria-label="Hearts Recovered" />
          </FormField>
          <FormField icon="mdi-flask-round-bottom-empty" label="Cooking Effect">
            <CustomSelect 
              name="cooking_effect" 
              value={form.cooking_effect} 
              onChange={handleChange}
              options={EFFECTS}
            />
          </FormField>
        </div>
      )}

      {/* Common Locations — dropdown + tags */}
      <FormField icon="mdi-map" label="Common Locations">
        <TagSelector
          items={form.common_locations}
          available={REGIONS.filter(r => !form.common_locations.includes(r))}
          onAdd={handleLocationAdd}
          onRemove={removeLocation}
          placeholder="-- Add a location --"
        />
      </FormField>

      {/* Drops — dropdown + tags */}
      <FormField icon="mdi-treasure-chest" label="Drops">
        <TagSelector
          items={form.drops}
          available={availableDrops.filter(d => !form.drops.includes(d))}
          onAdd={handleDropAdd}
          onRemove={removeDrop}
          placeholder={availableDrops.length ? '-- Select a drop to add --' : 'Loading drops...'}
          searchable
          capitalize
        />
      </FormField>

      <div className="edit-form__actions">
        <button type="submit" className="btn btn--edit">
          {isCreate ? 'Create Entry' : 'Save Changes'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}


