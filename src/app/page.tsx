"use client"
import Image from 'next/image'
import styles from './page.module.css'
import data from "../../data.json"
import { useState } from 'react'
import './index.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({subsets: ["latin"]})
interface TimeFrame {
  daily: Time,
  weekly: Time,
  monthly: Time,
}
interface Time {
  current: number,
  previous: number
}

function WorkBoard({ item, period, name }: {
  item: { title: string, timeframes: TimeFrame },
  period: "daily" | "weekly" | "monthly", name: string
}) {
  console.log(name);

  return (

    <div className={`grid-item ${name}`}>
      <div className="space">
        <Image
        className='activity-icon'
          src={`/images/icon-${item.title.toLowerCase().split(" ").join("-")}.svg`}
          width={50}
          height={50}
          alt='Activity icon' />
      </div>
      <div className={`item`}>
        <div className="work">
          <h4>{item.title}</h4>
          <Image
          src={`/images/icon-ellipsis.svg`}
          width={30}
          height={6}
          alt='ellipsis icon'
          className='ellipsis-icon' />
        </div>
        <div className="time">
          <h3>{period === "daily"
            ? item.timeframes.daily.current
            : period === "weekly"
              ? item.timeframes.weekly.current
              : item.timeframes.monthly.current}hrs</h3>
          <p>Last{period === "daily"
            ? ` day - ${item.timeframes.daily.previous}`
            : period === "weekly"
              ? ` week - ${item.timeframes.weekly.previous}`
              : ` month - ${item.timeframes.monthly.previous}`}hrs</p>
        </div>
      </div>
    </div>
  )
}
export default function Home() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  return (
    <main>
      <div className="grid-container">
        <div className="user grid-item">
          <div className="user_details">
            <Image src={'/images/image-jeremy.png'} alt={'a picture of jeremy'} width={60} height={60} />
            <div className="user_intro">
              <p>Report for</p>
              <h2><span className="line1">Jeremy</span> Robson</h2>
            </div>
          </div>
          <div className='period'>
            <h3 onClick={() => setPeriod("daily")}>Daily</h3>
            <h3 onClick={() => setPeriod("weekly")}>Weekly</h3>
            <h3 onClick={() => setPeriod("monthly")}>Monthly</h3>
          </div>
        </div>
        {/* <div className="grid-container"> */}
          {data.map((item, index) => <WorkBoard item={item}
            key={item.title}
            period={period}
            name={`grid${index}`} />)}
      </div>
      {/* </div> */}

      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/Khun111">Oluwatobi</a>.
      </footer>
      </main>
  )
}
