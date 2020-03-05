import React from 'react'
import dayjs from 'dayjs'
import './tab.scss'

export default function Item(props) {
  const { data, itemClick } = props
  // 日期时间输出
  const getDate = (time) => {
    const date = dayjs(time).format('YYYY-MM-DD')
    const nowDate = dayjs().format('YYYY-MM-DD')
    if (date === nowDate) return dayjs(time).format('HH:mm')
    return date
  }

  const itemClickHandle = () => {
    itemClick && itemClick()
  }

  return (
    <div className={data.selected ? 'tab_list-item tab_list-item_selected' : 'tab_list-item'} onClick={itemClickHandle}>
      <div className="tab_list-item_icon">
        <img src={data.avatar} alt="img" />
      </div>
      <div className="tab_list-item_text">
        {
          data.type === 'single' ?
            <div className="tab_list-item_title">
              <span className="tab_list-item_single">
                {data.nick}
              </span>
            </div>
            : (
              <>
                <div className="tab_list-item_title">
                  <span className="tab_list-item_nick">
                    {data.nick}
                  </span>
                  <span className="tab_list-item_time">
                    { getDate(data.time) }
                  </span>
                </div>
                <div className="tab_list-item_desc">
                  {data.desc}
                </div>
              </>
            )
        }
      </div>
    </div>
  )
}