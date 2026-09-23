import { Card } from '../ui';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Табло</h1>
      <Card title="Добре дошъл в администрацията на IV Glass">
        <p className="text-[14px] text-[#68777D] leading-[1.7] m-0">
          От менюто вляво можеш да редактираш текстовете по сайта, да качваш снимки в медия
          библиотеката, да управляваш галерията и проектите, и да сменяш цветовете и шрифтовете
          на сайта. Промените стават видими на живо на сайта веднага след запазване.
        </p>
      </Card>
    </div>
  );
}
