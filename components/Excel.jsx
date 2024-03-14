import 'table2excel';
import { useEffect } from 'react';
export default function Excel({Trigger}) {
  useEffect(() => {
if(Trigger){
    const Table2Excel = window.Table2Excel;
    const table2excel = new Table2Excel();
    table2excel.export(document.querySelector("#records"));
}
  }, [Trigger])
  
}
