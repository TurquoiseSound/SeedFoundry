'use client'

import React, { useContext } from 'react';
import Select, { ActionMeta, components, MultiValue, OptionProps, ClearIndicatorProps } from 'react-select';
import { type Goal } from '@/types';
import styles from './GoalsSelect.module.scss';
import { GoalsContext } from '@/app/GoalsProvider';

const Option = (props: OptionProps<Goal>) => {
  const { isSelected, isMulti, data } = props;

  const onClickMultiOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.selectOption({...data});
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <components.Option {...props}>
      { !!isMulti
        ? ( <div onClick={onClickMultiOption}>
              <input type='checkbox' checked={isSelected} value={data.value} /> {props.children}
           </div>
        ) : props.children
      }
   </components.Option>
  )
}

const ClearIndicator = (props: ClearIndicatorProps<Goal, true>) => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    selectProps
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
    >
      <div style={{ padding: '0px 5px', color: 'white', backgroundColor: 'var(--seed-color)' }}>{selectProps?.value ? <span>{((selectProps.value) as Goal[]).length} ×</span> : null}</div>
    </div>
  );
};

export default function GoalsSelect({ goals } : { goals: Goal[] }) {
  let { selectedGoals, setSelectedGoals }  = useContext(GoalsContext);

  const handleChangeSelect = (newValue: MultiValue<Goal>, action: ActionMeta<Goal>) => {
    const option = action.option
    if (action.action === 'clear') {
      setSelectedGoals([]);
      return
    }
    if (!option) return;
    if (action.action === 'deselect-option') {
      setSelectedGoals(selectedGoals.filter(goal => goal.value !== option.value));
    } else if (action.action === 'select-option') {
      setSelectedGoals([...selectedGoals, option]);
    }
  }

  return (
    <Select
      className={styles.goalsSelect}
      classNamePrefix="goals"
      classNames={{
        menu: (state) => styles.goalsMenu
      }}
      closeMenuOnSelect={false}
      components={{ ClearIndicator, Option }}
      controlShouldRenderValue={false}
      defaultValue={selectedGoals}
      hideSelectedOptions={false}
      instanceId="goals-select"
      isMulti
      menuPortalTarget={document.body}
      name="goals"
      onChange={handleChangeSelect}
      options={goals}
      placeholder="What are your goals?"
    />
  );
}