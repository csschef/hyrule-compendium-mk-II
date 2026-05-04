// Renders entry details dynamically based on category.
import './ItemDetails.css'

export default function ItemDetails({ entry, actions }) {
  const {
    name,
    category,
    description,
    image,
    common_locations,
    drops,
    edible,
    hearts_recovered,
    cooking_effect,
    properties,
  } = entry

  const attack = properties?.attack
  const defense = properties?.defense

  // Helper to render a capitalized drop list
  const formatDrops = (arr) => Array.isArray(arr) && arr.length > 0
    ? arr.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')
    : 'Unknown'

  // Helper to render common locations
  const formatLocations = (arr) => Array.isArray(arr) && arr.length > 0
    ? arr.join(', ')
    : 'Unknown'

  return (
    <div id="compendium-detail">
      {actions && (
        <div className="detail-actions">{actions}</div>
      )}
      <h2 className="detail-title">{name}</h2>

      <div className="detail-container">
        <img src={image} alt="Entry illustration" className="detail-image" />

        <div className="detail-info">
          <p className="detail-description">{description}</p>

          <p className="detail-category">
            <i className="mdi mdi-tag"></i> Category: {category}
          </p>

          {/* Equipment */}
          {attack !== undefined && (
            <p className="detail-attack">
              <i className="mdi mdi-sword"></i> Attack: {attack}
            </p>
          )}
          {defense !== undefined && (
            <p className="detail-defense">
              <i className="mdi mdi-shield-half-full"></i> Defense: {defense}
            </p>
          )}

          {/* Creatures & Materials */}
          {edible !== undefined && (
            <p className="detail-edible">
              <i className="mdi mdi-pot-mix"></i> Edible: {edible ? 'Yes' : 'No'}
            </p>
          )}
          {hearts_recovered !== undefined && hearts_recovered > 0 && (
            <p className="detail-hearts-recovered">
              <i className="mdi mdi-heart"></i> Hearts recovered: {hearts_recovered}
            </p>
          )}
          {cooking_effect && (
            <p className="detail-cooking-effect">
              <i className="mdi mdi-flask-round-bottom-empty"></i> Cooking effect: {cooking_effect.charAt(0).toUpperCase() + cooking_effect.slice(1)}
            </p>
          )}

          {/* Shared */}
          {common_locations?.length > 0 && (
            <p className="detail-common-locations">
              <i className="mdi mdi-map"></i> Common locations: {formatLocations(common_locations)}
            </p>
          )}
          {drops?.length > 0 && (
            <p className="detail-drops">
              <i className="mdi mdi-treasure-chest"></i> Drops: {formatDrops(drops)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
