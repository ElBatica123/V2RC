import { Datatables } from "../../components/Datatables";
export function Property() {
  const i = "true";
  console.log(i);
  return (
    <section className="sections" id="section__property">
      <div className="table-zone">
        <Datatables />
      </div>
    </section>
  );
}
