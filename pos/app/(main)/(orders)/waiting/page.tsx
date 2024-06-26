"use client"

import { useEffect } from "react"
import { queries as orderQueries } from "@/modules/orders/graphql"
import useFullOrders from "@/modules/orders/hooks/useFullOrders"
import { waitingScreenAtom } from "@/store/config.store"
import { useAtomValue } from "jotai"

import { ORDER_ITEM_STATUSES, ORDER_STATUSES } from "@/lib/constants"
import Loader from "@/components/ui/loader"
import { ScrollArea } from "@/components/ui/scroll-area"

import Order from "../components/OrderAtWaiting"

const { DONE, DOING, REDOING, COMPLETE } = ORDER_STATUSES

const Waiting = () => {
  const { fullOrders, loading, subToOrderStatuses, subToItems } = useFullOrders(
    {
      query: orderQueries.ordersAtWaiting,
      variables: {
        statuses: [DONE, DOING, REDOING],
        sortDirection: -1,
        sortField: "modifiedAt",
        perPage: 30,
      },
    }
  )
  const waitingScreen = useAtomValue(waitingScreenAtom)

  useEffect(() => {
    subToOrderStatuses([DOING, DONE, COMPLETE, REDOING])
    subToItems([ORDER_ITEM_STATUSES.CONFIRM, DONE])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loader />

  if (!waitingScreen) {
    return null
  }

  return (
    <ScrollArea>
      <div className="grid m-5 flex-wrap 2xl:grid-cols-8 gap-8 xl:grid-cols-6 grid-cols-5">
        {fullOrders.map((order) => (
          <Order {...order} key={order._id} />
        ))}
      </div>
    </ScrollArea>
  )
}

export default Waiting
