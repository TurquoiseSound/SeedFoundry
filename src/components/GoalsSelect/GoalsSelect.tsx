'use client'

import React from 'react';
import Select, { components, OptionProps, ClearIndicatorProps, MultiValueGenericProps, PlaceholderProps } from 'react-select';
import { type Goal } from '../../app/api/fetchGoals';
import styles from './GoalsSelect.module.scss';

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
      hideSelectedOptions={false}
      instanceId="goals-select"
      isMulti
      name="goals"
      options={goals}
      placeholder="What are your goals?"
    />
  );
}
