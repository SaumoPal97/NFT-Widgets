import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const UserForm = ({ setText }) => {
  const address = useRef(null);
  const chain = useRef(null);

  return (
    <div className="flex flex-col mt-5 mb-5">
      <span className="font-bold">Account Address</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={address}
      ></input>
      <span className="font-bold">Chain</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={chain}
      ></input>
      <span
        className="font-bold self-center text-white bg-purple-500 rounded-md px-2 py-1"
        onClick={() =>
          setText(
            `<script src="http://localhost:1234/app.c328ef1a.js" data-type="user" data-address="${address.current.value}" data-chain="${chain.current.value}"></script>`
          )
        }
      >
        Submit
      </span>
    </div>
  );
};
const CollectionForm = ({ setText }) => {
  const slug = useRef(null);

  return (
    <div className="flex flex-col mt-5 mb-5">
      <span className="font-bold">Collecion Slug</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={slug}
      ></input>
      <span
        className="font-bold self-center text-white bg-purple-500 rounded-md px-2 py-1"
        onClick={() =>
          setText(
            `<script src="http://localhost:1234/app.c328ef1a.js" data-type="collection" data-slug="${slug.current.value}"></script>`
          )
        }
      >
        Submit
      </span>
    </div>
  );
};
const NftForm = ({ setText }) => {
  const address = useRef(null);
  const id = useRef(null);

  return (
    <div className="flex flex-col mt-5 mb-5">
      <span className="font-bold">Contract Address</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={address}
      ></input>
      <span className="font-bold">Token Id</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={id}
      ></input>
      <span
        className="font-bold self-center text-white bg-purple-500 rounded-md px-2 py-1"
        onClick={() =>
          setText(
            `<script src="http://localhost:1234/app.c328ef1a.js" data-type="nft" data-address="${address.current.value}" data-id="${id.current.value}"></script>`
          )
        }
      >
        Submit
      </span>
    </div>
  );
};
const AuctionForm = ({ setText }) => {
  const address = useRef(null);
  const id = useRef(null);
  const curator = useRef(null);

  return (
    <div className="flex flex-col mt-5 mb-5">
      <span className="font-bold">Token Contract Address</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={address}
      ></input>
      <span className="font-bold">Token Id</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={id}
      ></input>
      <span className="font-bold">Curator Address</span>
      <input
        type="text"
        className="border border-purple-500 rounded-md px-1 py-1 mb-3"
        ref={curator}
      ></input>
      <span
        className="font-bold self-center text-white bg-purple-500 rounded-md px-2 py-1"
        onClick={() =>
          setText(
            `<script src="http://localhost:1234/app.c328ef1a.js" data-type="auction" data-address="${address.current.value}" data-id="${id.current.value}" data-curator="${curator.current.value}"></script>`
          )
        }
      >
        Submit
      </span>
    </div>
  );
};
export default function WidgetCreator() {
  const [selected, setSelected] = useState("user");
  const [text, setText] = useState("");

  return (
    <div className="mt-24">
      <div className="flex flex-row w-full">
        <span
          className={`px-2 py-1 border border-purple-500 rounded-t-md font-bold cursor-pointer ${
            selected === "user" ? "bg-purple-500 text-white" : "text-purple-500"
          }`}
          onClick={() => {
            setSelected("user");
            setText("");
          }}
        >
          User Widget
        </span>
        <span
          className={`px-2 py-1 border border-purple-500 rounded-t-md font-bold cursor-pointer ${
            selected === "collection"
              ? "bg-purple-500 text-white"
              : "text-purple-500"
          }`}
          onClick={() => {
            setSelected("collection");
            setText("");
          }}
        >
          Collection Widget
        </span>
        <span
          className={`px-2 py-1 border border-purple-500 rounded-t-md font-bold cursor-pointer ${
            selected === "nft" ? "bg-purple-500 text-white" : "text-purple-500"
          }`}
          onClick={() => {
            setSelected("nft");
            setText("");
          }}
        >
          NFT Widget
        </span>
        <span
          className={`px-2 py-1 border border-purple-500 rounded-t-md font-bold cursor-pointer ${
            selected === "auction"
              ? "bg-purple-500 text-white"
              : "text-purple-500"
          }`}
          onClick={() => {
            setSelected("auction");
            setText("");
          }}
        >
          Auction Widget
        </span>
      </div>
      <div className="border border-purple-500 px-2 py-1 rounded-b-md">
        {selected === "user" ? (
          <UserForm setText={setText} />
        ) : selected === "collection" ? (
          <CollectionForm setText={setText} />
        ) : selected === "nft" ? (
          <NftForm setText={setText} />
        ) : (
          <AuctionForm setText={setText} />
        )}
      </div>
      {text.length > 0 ? (
        <div className="flex flex-row justify-center mt-10 items-center">
          <span className="mx-2 px-2 py-1 border rounded-md bg-gray-300 border-black max-w-lg">
            {text}
          </span>
          <CopyToClipboard text={text}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </span>
          </CopyToClipboard>
        </div>
      ) : null}
    </div>
  );
}
