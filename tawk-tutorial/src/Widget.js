export class Widget {
  constructor() {
    this.open = false;
    this.data = null;
    this.scripts = document.getElementsByTagName("script");
    this.lastScript = this.scripts[this.scripts.length - 1];
    this.type = this.lastScript.getAttribute("data-type");
    this.fetchData();
    this.createStyles();
  }

  fetchData() {
    if (this.type === "user") {
      let address = this.lastScript.getAttribute("data-address");
      let chain = this.lastScript.getAttribute("data-chain");
      fetch(`https://api.nftport.xyz/v0/accounts/${address}?chain=${chain}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "e7e376bb-134b-4bc6-8646-7c4eab6c0a7f",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.data = { span1: address, span2: data.nfts[0].name };
          this.initialise();
        });
    }
    if (this.type === "collection") {
      let slug = this.lastScript.getAttribute("data-slug");

      fetch(`https://testnets-api.opensea.io/api/v1/collection/${slug}/stats`, {
        method: "GET",
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          this.data = { span1: slug, span2: `${data.stats.average_price} ETH` };
          this.initialise();
        });
    }
    if (this.type === "nft") {
      let address = this.lastScript.getAttribute("data-address");
      let id = this.lastScript.getAttribute("data-id");
      let chain = this.lastScript.getAttribute("data-chain");

      fetch(`https://api.nftport.xyz/v0/nfts/${address}/${id}?chain=${chain}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "e7e376bb-134b-4bc6-8646-7c4eab6c0a7f",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.data = {
            span1:
              (data.contract || {}).symbol ||
              (data.nft || {}).metadata.description,
            span2: data.nft.cached_file_url,
          };
          this.initialise();
        });
    }
    if (this.type === "auction") {
      let address = this.lastScript.getAttribute("data-address");
      let id = this.lastScript.getAttribute("data-id");
      let curator = this.lastScript.getAttribute("data-curator");

      fetch("https://indexer-prod-mainnet.zora.co/v1/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `       
            query {
              Auction(
                where: { tokenContract:{_eq: "${address}"}, tokenId:{_eq:"${id}"}, curator:{_eq:"${curator}"} }
                order_by: { auctionId: desc }
                limit: 10
              ) {
                tokenContract
                tokenId
                tokenOwner
                auctionCurrency
                reservePrice
                curator
                curatorFee
                approved
                expiresAt
                winner
                lastBidder
                lastBidAmount
              }
            }
      `,
          variables: null,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data.Auction);
          this.data = {
            span1: "Live Auction",
            span2: new Date(data.data.Auction[0].expiresAt),
          };
          this.initialise();
        });
    }
  }

  initialise() {
    const container = document.createElement("div");
    const span1 = document.createElement("span");
    const text1 = document.createTextNode((this.data || {}).span1);
    span1.appendChild(text1);
    const span2 = document.createElement("span");
    if (this.type === "nft") {
      const img = document.createElement("img");
      img.style.width = "50px";
      img.style.height = "50px";
      img.src = (this.data || {}).span2;
      span2.appendChild(img);
    } else {
      const text2 = document.createTextNode((this.data || {}).span2);
      span2.appendChild(text2);
    }
    container.appendChild(span1);
    container.appendChild(span2);
    container.classList.add("widget-container");
    span1.classList.add("span1-container");
    span2.classList.add("span2-container");
    document.getElementById("nft-container").appendChild(container);
  }

  createStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
            .widget-container {
                display: flex;
                flex-direction: row;
                border-radius: 0.375rem;
                padding: 
            }
            .span1-container {
                background-color: rgb(254 243 199);	
                border-top-left-radius: 0.375rem;
                border-bottom-left-radius: 0.375rem;
                border: 1px solid gray;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100px;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
            }
            .span2-container {
                background-color: rgb(245 245 244);	
                border-top-right-radius: 0.375rem;
                border-bottom-right-radius: 0.375rem;
                border: 1px solid gray;
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
            }
        `.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }
}
