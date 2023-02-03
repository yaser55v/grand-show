import React, { useState } from "react"
import { Tab } from "@headlessui/react"
import Popular from "./Popular"
import SeriaTV from "./SeriaTV"
import TopMovies from "./TopMovies"
import TopTv from "./TopTv"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const List = () => {
  let [categories] = useState({
    Movies: [
      {
        id: 1,
        component: <Popular />,
      },
    ],
    TV: [
      {
        id: 1,
        component: <SeriaTV />,
      },
    ],
    "Top Movies": [
      {
        id: 1,
        component: <TopMovies />,
      },
    ],
    "Top TV": [
      {
        id: 1,
        component: <TopTv />,
      },
    ],
  })

  return (
    <div className="container mx-auto">
      <div className="w-full  px-2 py-16 sm:px-0">
        <Tab.Group>
          <h4 className="text-blue-100 block md:hidden text-center mb-4">
            Categories
          </h4>
          <Tab.List className="flex p-1 space-x-1 border rounded-full w-full">
            <h5 className="text-white hidden md:block pl-8 pr-20 py-2.5 text-lg leading-5 font-bold">
              Categories
            </h5>
            {Object.keys(categories).map(category => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-0 lg:py-2.5 text-xs lg:text-sm px-1 lg:font-semibold text-black rounded-full ",
                    "focus:outline-none focus:ring-green-300 ring-offset-2 ring-opacity-60 ring-green-300",
                    selected
                      ? "shadow-custom bg-gradient-to-r from-green-400 to-blue-500 border-green-200 border"
                      : "text-blue-100  hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((items, idx) => (
              <Tab.Panel key={idx}>
                <>
                  {items.map(item => (
                    <div className="" key={item.id}>
                      {item.component}
                    </div>
                  ))}
                </>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
export default List
