import { useEffect, useState } from "react";
import Type from "./Type";
import { DamageRelations as DamageRelationsProps } from "../types/DamageRelationOfPokemonTypes";
import {
  Damage,
  DamageFromAndTo,
  SeparateDamages,
} from "../types/SeparateDamageRelations";

interface DamageModalProps {
  damages: DamageRelationsProps[];
}

interface Info {
  name: string;
  url: string;
}

const DamageRelations = ({ damages }: DamageModalProps) => {
  const [damagePokemon, setDamagePokemon] = useState<SeparateDamages>();

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

  const separateObjectBetweenToAndFrom = (
    damage: DamageRelationsProps
  ): DamageFromAndTo => {
    const from = filterDamageRelations("_from", damage);
    const to = filterDamageRelations("_to", damage);

    return {
      from,
      to,
    };
  };

  const filterDamageRelations = (
    valueFilter: string,
    damage: DamageRelationsProps
  ) => {
    const result: SeparateDamages = Object.entries(damage)
      .filter(([keyName, _]) => keyName.includes(valueFilter))
      .reduce((acc, [key, value]): SeparateDamages => {
        const keyWithValueFilterRemove = key.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  const joinDamageRelations = (props: DamageFromAndTo[]): DamageFromAndTo => ({
    to: joinObjects(props, "to"),
    from: joinObjects(props, "from"),
  });

  const joinObjects = (props: DamageFromAndTo[], string: string) => {
    const key = string as keyof (typeof props)[0];

    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];

    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]: [string, Damage]) => {
        // double_damage, half_damage, no_damage
        const key = keyName as keyof typeof firstArrayValue;

        const result = firstArrayValue[key]?.concat(value);

        return (acc = { [keyName]: result, ...acc });
      },
      {}
    );

    return result;
  };

  const reduceDuplicateValues = (props: SeparateDamages) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);

      return (acc = { [key]: verifiedValue, ...acc });
    }, {});
  };
  //  중복 제거
  const filterForUniqueValues = (
    valueForFiltering: Damage[],
    damageValue: string
  ) => {
    const initialArray: Damage[] = [];

    return valueForFiltering.reduce((acc, cur) => {
      const { url, name } = cur;
      const filterAcc = acc.filter((a) => a.name !== name);
      return filterAcc.length === acc.length
        ? (acc = [cur, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterAcc]);
    }, initialArray);
  };

  const postDamageValue = (props: SeparateDamages): SeparateDamages => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return (acc = {
        [key]: value.map((i: Info[]) => ({
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
          {Object.entries(damagePokemon).map(
            ([keyName, value]: [string, Damage[]]) => {
              const key = keyName as keyof typeof damagePokemon;

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
                          <Type
                            type={name}
                            key={url}
                            damageValue={damageValue}
                          />
                        );
                      })
                    ) : (
                      <Type type={"none"} key={"none"} />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </>
      ) : null}
    </div>
  );
};

export default DamageRelations;
