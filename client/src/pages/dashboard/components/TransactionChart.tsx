import { createEffect, createMemo, createSignal, on, onCleanup, ParentProps } from 'solid-js';
import { Chart, registerables } from 'chart.js';
import { TransactionDto } from '@app/models';
import dayjs from 'dayjs';

Chart.register(...registerables);

type Props = {
  transactions?: TransactionDto[];
}

export const TransactionChart = (props: ParentProps<Props>) => {
  let chart: Chart;

  const [ref, setRef] = createSignal<HTMLCanvasElement>();

  const config = createMemo(() => {
    const transactions = [...(props.transactions || [])].reverse()

    const labels = transactions
      .filter(tr => !tr.profit)
      .map(tr => dayjs(tr.date).fromNow());

    const data = transactions
      .filter(tr => !tr.profit)
      .map(tr => tr.sum);

    return {
      labels: labels,
      datasets: [{
        label: 'Transactions',
        backgroundColor: 'rgb(108, 178, 136)',
        borderColor: 'rgb(108, 178, 136)',
        data: data,
      }]
    };
  });

  createEffect(on(ref, div => {
    chart = new Chart(
      div, {
        type: 'line',
        data: config(),
        options: {}
      }
    );
  }));

  createEffect(on(config, (config) => {
    chart.destroy()
    chart = new Chart(
      ref(), {
        type: 'line',
        data: config,
        options: {}
      }
    );
  }));

  onCleanup(() => {
    chart.destroy();
  });

  return (
    <div class="w-full h-full">
      <canvas ref={setRef}/>
    </div>
  );
};
