import Item from './Item'

export default function ItemList({ items, game }) {
  return (
    <div id="compendium-list">
      {items.map(item => (
        <Item key={item.id} item={item} game={game} />
      ))}
    </div>
  )
}
