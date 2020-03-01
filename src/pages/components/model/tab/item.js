import React from 'react'
import dayjs from 'dayjs'
import './tab.scss'

export default function Item(props) {
  const { data, itemClick } = props
  return (
    <div className="tab_list-item" onClick={itemClick}>
      <div className="tab_list-item_icon">
        <img src={data.avatar} />
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
                    {dayjs(data.time).format('HH:mm')}
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