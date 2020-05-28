import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ReactElement,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
  [prop: string]: any
}
// & 交叉
export type DataSourceType<T = {}> = DataSourceObject & T
// export type DataSourceType = DataSourceObject & GitUserProps

export interface AutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (value: any) => ReactElement
}

export const AutoComplete: React.FC<AutoComplete> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    renderOption,
    value,
    className,
    ...restProps
  } = props
  const [inputVale, setInputValue] = useState(value as string)
  const [loading, setLoading] = useState(false)
  // 存放下拉选中的内容
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const updateRef = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  // debounce
  const debouncedValue = useDebounce(inputVale, 500)
  // 点击此组件外部，关闭下拉框
  useClickOutside(componentRef, () => {setSuggestions([])})
  //   console.log(inputVale, suggestions)
  const classes = classNames('auto-complete', className, {})
  useEffect(() => {
    // console.log('after debounce')
    if (debouncedValue && updateRef.current) {
      const results = fetchSuggestion(debouncedValue)
      if (results instanceof Promise) {
        // console.log(results)
        results.then((data) => {
          setSuggestions(data)
          setLoading(false)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
      setLoading(false)
    }
    updateRef.current = false
    setHighlightIndex(-1)
  }, [debouncedValue])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    setLoading(true)
    updateRef.current = true
    // console.log('before debounce')
    // useDebounce()
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    updateRef.current = false
    if (onSelect) {
      onSelect(item)
    }
  }
  const handleHighlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
    // updateRef.current = false
  }
  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // enter
        // let item = suggestions[highlightIndex]
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // up
        // let index = highlightIndex + 1
        handleHighlight(highlightIndex - 1)
        break
      case 40: // down
        handleHighlight(highlightIndex + 1)
        break
      case 27: // esc
        setHighlightIndex(-1)
        setSuggestions([])
        break
      default:
        break
    }
  }
  const renderTemplates = (item: DataSourceType) => {
    if (renderOption) {
      return renderOption(item)
    } else {
      return item.value
    }
  }
  const generateDropDown = () => {
    return (
      <ul
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        {suggestions.map((item, index) => {
          const classes = classNames('suggestions-item', {
            'suggestions-active': index === highlightIndex,
          })
          return (
            <li
              className={classes}
              key={index}
              onClick={() => {
                handleSelect(item)
              }}
            >
              {renderTemplates(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="auto-complete-wrapper" ref={componentRef}>
      <Input
        value={inputVale}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loading ? (
        <div>
          <Icon icon="spinner" spin />
        </div>
      ) : null}
      {suggestions.length > 0 && generateDropDown()}
    </div>
  )
}

export default AutoComplete
