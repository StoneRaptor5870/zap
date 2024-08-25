"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Appbar } from "@/components/Appbar";
import { useRouter } from "next/navigation";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { DarkButton } from "@/components/buttons/DarkButton";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    } | null;
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    } | null;
  } | null;
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[] | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      })
      .catch(() => {
        setZaps(null);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function ZapList() {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : zaps && zaps.length > 0 ? (
        <div className="flex justify-center">
          <ZapTable zaps={zaps} />
        </div>
      ) : (
        <div className="flex justify-center text-xl mt-8">
          No zaps found. Create one!
        </div>
      )}
    </div>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  const filteredZaps = zaps.filter((zap) => zap.trigger !== null);

  return (
    <div className="pt-8 max-w-screen-lg w-full">
      <div className="flex justify-between gap-12">
        <div className="flex-1">Name</div>
        <div className="flex-1">ID</div>
        {/* <div className="flex-1">Created at</div> */}
        <div className="flex-1">Webhook URL</div>
        <div className="flex-1"></div>
      </div>
      {filteredZaps.map((z) => (
        <div key={z.id} className="flex border-b border-t py-4 gap-12">
          <div className="flex-1 flex">
            <img
              src={z.trigger!.type!.image}
              className="w-[30px] h-[30px]"
              alt="Trigger"
            />
            {z.actions.map((x) => (
              <img
                key={x.id}
                src={x.type?.image || ""}
                className="w-[30px] h-[30px]"
                alt="Action"
              />
            ))}
          </div>
          <div className="flex-1">{z.id}</div>
          {/* <div className="flex-1">{new Date().toLocaleString()}</div> */}
          <div className="flex-1">
            <a
              href={`${HOOKS_URL}/hooks/catch/${z.userId}/${z.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 underline hover:text-amber-700"
            >
              {`${HOOKS_URL}/hooks/catch/${z.userId}/${z.id}`}
            </a>
          </div>
          <div className="flex-1">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}
