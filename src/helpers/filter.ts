import { Product } from '../interfaces';

export const filter = (product: Product, label: string): any => {
  const form = JSON.parse(product.form);
  const { components } = form;
  let value = 0;
  let selectLabel = '';
  let d = false;

  for (let a = 0; a < components.length; a++) {
    let columns = components[a].columns;
    for (let b = 0; b < columns.length; b++) {
      let components = columns[b].components;
      if (components !== undefined && components.length > 0) {
        for (let i = 0; i < components.length; i++) {
          if (components[i].key === label && components[i].type === 'hidden') {
            value = 1;
          } else {
            value = 0;
          }
          if (components[i].key === label && components[i].type === 'select') {
            const defaultValue = components[i].defaultValue;
            let values = components[i].data.values;
            for (let j = 0; j < values.length; j++) {
              if (values[j].value === defaultValue) {
                selectLabel = values[j].label;
              }
            }
          } else if (
            components[i].key === label &&
            components[i].type === 'datetime'
          ) {
            d = true;
          } else {
            let col = components[i].columns;
            if (col !== undefined && col.length > 0) {
              for (let z = 0; z < col.length; z++) {
                let comp = col[z].components;
                if (comp !== undefined && comp.length > 0) {
                  for (let q = 0; q < comp.length; q++) {
                    if (comp[q].type === 'select' && comp[q].key === label) {
                      console.log(comp[q].key);
                      const defaultValue = comp[q].defaultValue;
                      let values = comp[q].data.values;
                      for (let j = 0; j < values.length; j++) {
                        if (values[j].value === defaultValue) {
                          selectLabel = values[j].label;
                        }
                      }
                    } else if (
                      comp[q].key === label &&
                      comp[q].type === 'datetime'
                    ) {
                      d = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return { value: value, selectLabel: selectLabel, isDate: d };
};
