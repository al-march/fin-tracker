import { createSignal, For, onMount, ParentProps } from 'solid-js';
import { Option, Select, SelectProps } from '@solsy/ui';
import { categoryApi } from '@app/services/api';
import { Category } from '@app/services/mappers';

type Props = {
  id: number;
  onCategoryChange?: (category: Category) => void;
} & SelectProps;

export const CategorySelect = (props: ParentProps<Props>) => {
  const [catsMap, setMap] = createSignal<Map<number, Category>>(new Map());
  const [cats, setCats] = createSignal<Category[]>([]);

  onMount(async () => {
    const cats = await categoryApi.getAll();
    /**
     * Todo: исправить селект в solsy.ui
     * при получения значения типа 0 | '' - не отрабатывает кастомное отображение;
     * необходимо всегда отбражать, кроме явного значения null | undefined
     */
    setMap(cats);
    setCats([...cats.values()]);
  });

  const customView = (id: number | string) => {
    const cat = catsMap().get(Number(id));
    return (
      <span class="flex items-center gap-2">
        <i class={cat?.icon}/>
        {cat?.name}
      </span>
    );
  };

  const onInput = (id: number | string) => {
    props.onInput?.(id);

    const cat = catsMap().get(Number(id));
    if (cat) {
      props.onCategoryChange?.(cat);
    }
  };

  return (
    <Select
      {...props}
      value={props.id + ''}
      customValue={customView}
      onInput={onInput}
    >
      <For each={cats()}>
        {cat => (
          <Option value={cat.id + ''}>
            <i class={cat.icon}/>
            {cat.name}
          </Option>
        )}
      </For>
    </Select>
  );
};
