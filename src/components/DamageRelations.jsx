import { useEffect, useState } from "react";
import Type from "./Type";

const DamageRelations = ({ damages }) => {
  const [damagePokemon, setDamagePokemon] = useState();

  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);
    return {
      from,
      to,
    };
  };

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length >= 2) {
      const obj = joinDamageRelations(arrayDamage);
      console.log(obj, postDamageValue(reduceDuplicateValues(obj.from)));
      setDamagePokemon(postDamageValue(reduceDuplicateValues(obj.from)));
    } else {
      setDamagePokemon(postDamageValue(arrayDamage[0]?.from));
    }
  }, []);

  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, _]) => keyName.includes(valueFilter))
      .reduce((acc, [key, value]) => {
        const keyWithValueFilterRemove = key.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  const joinDamageRelations = (props) => ({
    to: joinObjects(props, "to"),
    from: joinObjects(props, "from"),
  });

  const joinObjects = (props, string) => {
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];

    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]) => {
        const result = firstArrayValue[keyName].concat(value);

        return (acc = { [keyName]: result, ...acc });
      },
      {}
    );

    return result;
  };

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };
    return Object.entries(props).reduce((acc, [key, value]) => {
      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return (acc = { [key]: verifiedValue, ...acc });
    }, {});
  };
  //  중복 제거
  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    return valueForFiltering.reduce((acc, cur) => {
      const { url, name } = cur;
      const filterAcc = acc.filter((a) => a.name !== name);
      return filterAcc.length === acc.length
        ? (acc = [cur, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterAcc]);
    }, []);
  };

  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [key, value]) => {
      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return (acc = {
        [key]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
    return result;
  };

  return (
    <div className="flex gap-2 flex-col w-full">
      {damagePokemon ? (
        <>
          {Object.entries(damagePokemon).map(([key, value]) => {
            const valuesOfKeyName = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            };
            return (
              <div key={key}>
                <h3 className=" capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                  {valuesOfKeyName[key]}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center ">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => {
                      return (
                        <Type type={name} key={url} damageValue={damageValue} />
                      );
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default DamageRelations;
