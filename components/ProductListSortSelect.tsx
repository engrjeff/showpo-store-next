import { Maybe, SortFields } from "@/gql/graphql";

export function ProductListSortSelect({
  sortFields,
}: {
  sortFields: Maybe<SortFields> | undefined;
}) {
  return (
    <select>
      {sortFields?.options?.map((sortOption) => (
        <option key={sortOption?.value} value={sortOption?.value!}>
          {sortOption?.label}
        </option>
      ))}
    </select>
  );
}
