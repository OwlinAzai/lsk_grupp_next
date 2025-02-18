import FiltersClient from './FiltersClient';

export default function FiltersServer({ onFilterChange }) {
  return (
    <FiltersClient onFilterChange={onFilterChange} />
  );
}
