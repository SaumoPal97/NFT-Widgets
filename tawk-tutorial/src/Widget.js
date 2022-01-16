export class Widget {
  constructor() {
    this.open = false;
    this.data = null;
    this.initialise();
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
          this.data = data;
          console.log(data);
        });
    }
  }

  initialise() {
    const container = document.createElement("div");
    const span1 = document.createElement("span");
    const text1 = document.createTextNode("address");
    span1.appendChild(text1);
    const span2 = document.createElement("span");
    const text2 = document.createTextNode("some data");
    span2.appendChild(text2);
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
                width: 100px;
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
