'use client';
import Image from 'next/image';
import { imageLoader } from '~/lib//image-loader';
import type { UserSpot } from '~/types/common';
import { Button } from './ui/button';

import WebApp from '@twa-dev/sdk';
import { useState } from 'react';
import { unsubscribeSpot } from '~/actions/user-actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle
} from '~/components/ui/dialog';

export default function SpotCardEdit({ list }: { list: UserSpot[] }) {
  const user = WebApp.initDataUnsafe?.user;
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deletingItem = list.find((item) => item.id === deletingId);

  const deleteSpotSubscriptionHandler = async () => {
    try {
      setIsLoading(true);
      if (user?.id && deletingItem?.spot.id) await unsubscribeSpot(user?.id, deletingItem?.spot.id);
      setDeletingId(null);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg">
        {list.map((item) => (
          <SpotRow key={item.id} item={item} onDelete={() => setDeletingId(item.id)} />
        ))}
      </div>
      <Dialog open={!!deletingId}>
        <DialogPortal>
          <DialogContent className="max-w-[22rem] rounded-lg border-none bg-gray-dark">
            <DialogHeader>
              <DialogTitle>Вы уверены?</DialogTitle>
              <DialogDescription>Выйти со спота {deletingItem?.spot.name}?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => setDeletingId(null)}
                type="button"
                variant="outline"
                disabled={isLoading}
              >
                Отмена
              </Button>

              <Button
                onClick={deleteSpotSubscriptionHandler}
                type="button"
                variant="destructive"
                disabled={isLoading}
              >
                Выйти
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}

function SpotRow({ item, onDelete }: { item: UserSpot; onDelete: () => void }) {
  return (
    <div className="flex w-full items-center gap-3 border-b border-white/15 bg-white/10 px-3 py-2 last:border-none">
      <Image loader={imageLoader} src={item.spot.types.image ?? ''} alt="" width={32} height={32} />
      <div className="flex flex-col gap-1">
        <h3 className="text-sm">{item.spot.name}</h3>
        <p className="text-[10px] text-white/40">{item.spot.location}</p>
      </div>
      <Button
        onClick={onDelete}
        type="button"
        variant="ghost"
        size="icon"
        className="flex-1 justify-end"
      >
        <Image src="/Delete.svg" alt="" width={24} height={24} />
      </Button>
    </div>
  );
}
