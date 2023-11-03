// ==UserScript==
// @name         Create NanoPublication
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Elixir BioHackathon Europe 2023 - project 26
// @author       project 26
// @match        https://europepmc.org/article/*
// @match        https://www.ncbi.nlm.nih.gov/pubmed/*
// @match        https://www.nature.com/articles/*
// @match        https://www.science.org/doi/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nanopub.net
// @require      https://unpkg.com/axios@1.6.0/dist/axios.min.js
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
(async function() {

    /* this is a hard-coded token to circumvent authentication and Nanopub key generation */
    const AUTH_TOKEN = "Bearer aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

    /* Add CSS style */
    var style = document.createElement('style');
    var css = `
      #nanopub-elixir-biohackaton-project26-selection {
            position: absolute;
            top: 0;
            left 0;
            z-index: 10000000;
            display: flex;
      }

      #nanopub-elixir-biohackaton-project26-cart {
            position: fixed;
            right: 0;
            bottom: 0;
            z-index: 10000000;
            border: 1px solid black;
            background: white;
            color: black;
            padding: 1rem;
            min-height: 2rem;
            max-width: 38rem;
            box-shadow: 2px 2px 5px black;

            display: flex;
            flex-direction: column;
      }

      #nanopub-elixir-biohackaton-project26-cart h1 {
            font-size: 2rem;
            font-familly: arial;
            margin-bottom: 1rem;
            font: sans;
            color: black;
      }

      #nanopub-elixir-biohackaton-project26-cart h2 {
            text-align: left;
            font-size: 1.5rem;
            margin-top: 1rem;
            font: sans;
            color: black;
      }

      #nanopub-elixir-biohackaton-project26-cart h2 .current {
            background-color: yellow;
      }

      #nanopub-elixir-biohackaton-project26-cart .quote {
            display: flex;
            flex-direction: row;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
      }

      #nanopub-elixir-biohackaton-project26-cart .assertion {
            border: 1px solid black;
            box-shadow: none;
            margin: 1rem 0.5rem;
      }

      #nanopub-elixir-biohackaton-project26-cart .quote a {
            display: block;
            white-space: nowrap;
            width: 33rem;
            max-width: 33rem;
            overflow: hidden;
            text-align: left;
      }

      #nanopub-elixir-biohackaton-project26-cart .quote button {
            display: inline-block;
      }
    `;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    /* MODEL */
    class Quote {
        constructor(source, selector) {
            this.source = source;
            this.selector = selector;
        }

        urlFragment() {
            return `#:~:text=${this.selector.prefix}${this.selector.exact}${this.selector.suffix}`;
        }

        urlLabel() {
            return decodeURIComponent(this.selector.exact);
        }

        equals(other) {
            if (this.source !== other.source) {
                return false;
            }
            if (this.selector.prefix !== other.selector.prefix) {
                return false;
            }
            if (this.selector.exact !== other.selector.exact) {
                return false;
            }
            if (this.selector.suffix !== other.selector.suffix) {
                return false;
            }
            return true;
        }

        toJSON() {
            return {
                source: this.source,
                selector: this.selector,
            };
        }

        static fromJSON(json) {
            return new Quote(json.source, json.selector);
        }
    }

    class NanoPub {
        constructor(quote_list, assertion) {
            this.quote_list = quote_list;
            this.assertion = assertion;
        }

        removeAllQuotes() {
            this.quote_list = [];
        }

        addQuote(source, selector) {
            const newQuote = new Quote(source, selector);
            this.deleteQuote(newQuote);
            this.quote_list.push(newQuote);
            return this;
        }

        deleteQuote(quote) {
            this.quote_list = this.quote_list.filter((q) => !q.equals(quote));
        }

        isEmpty() {
            return (this.quote_list.length === 0 && this.assertion === "");
        }

        toJSON() {
            return {
                provenance: this.quote_list.map(q => q.toJSON()),
                assertion: this.assertion,
            };
        }

        toJSONLD() {
            const result = {
                "@context": "http://www.w3.org/ns/anno.jsonld",
                "@graph": this.quote_list.map(q => this.#QuoteToJSONLD(q))
            };
            return result;
        }

        #QuoteToJSONLD(quote) {
            return {
                "type": "Annotation",
                "bodyValue": this.assertion,
                "target": quote.toJSON(),
            }
        }

        static fromJSON(json) {
            const quote_list = json.provenance.map(q => new Quote(q.source, q.selector));
            return new NanoPub(quote_list, json.assertion);
        }
    }

    function getNanoPubUrl(response) {
        const lines = response.data.split(/\r?\n/);
        for (const line of lines) {
            if (line.startsWith("@prefix this: ")) {
                let url = line.slice(15, line.length - 3);
                return url.replace("http://", "https://")
            }
        }
        return null;
    }

    function publishNanoPub(model, authtoken) {
        /* TODO: Manage ORCID OAuth 2
         */
        const instance = axios.create({
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authtoken,
            }
        });
        instance.post('https://api.collaboratory.semanticscience.org/assertion?publish=true&add_biolink_version=false&shacl_validation=false', model.toJSONLD())
            .then(function (response) {
              const url = getNanoPubUrl(response);
              GM_openInTab(url, false);
            })
            .catch(function (error) {
              // Add user feed back
              console.log(error);
              alert(error);
            });
    }

    function newButtonElement() {
        const btn = document.createElement('button');
        btn.style.background = "transparent";
        btn.style.padding = "0.5rem 1rem";
        btn.style.margin = "0 0.5rem";
        btn.style.border = "none";
        btn.style.color = "black";
        btn.style.font = "16px monospace";
        return btn;
    }

    function createButton(label) {
        // Create a new button element.
        const btnCreate = document.createElement('button');
        btnCreate.textContent = label;
        btnCreate.style.display = "flex";
        btnCreate.style.alignItems = "center";
        btnCreate.style.justifyContent = "center";
        btnCreate.style.height = "2.5rem";
        btnCreate.style.background = "#99ccff";
        btnCreate.style.padding = "0.5rem 1rem";
        btnCreate.style.margin = "0 0.5rem";
        btnCreate.style.border = "1px solid black";
        btnCreate.style.color = "black";
        btnCreate.style.font = "16px monospace";
        return btnCreate;
    }

    class CartQuote {
        constructor(quote) {
            this.quote = quote;

            const link = document.createElement('a');
            // FIXME: deal with multiple document URL
            link.href = quote.urlFragment();
            link.innerText = quote.urlLabel();

            const self = this;

            function deleteThisQuote() {
              CART.deleteQuote(self.quote);
            }

            const deleteBtn = newButtonElement();
            deleteBtn.onclick = deleteThisQuote;
            deleteBtn.innerHTML = '❌';

            const container = document.createElement('div');
            container.className = "quote";
            container.appendChild(link);
            container.appendChild(deleteBtn);

            this.element = container;
        }

    }

    class Cart {
        constructor() {
            const cartContainer = document.createElement('div');
            cartContainer.id = "nanopub-elixir-biohackaton-project26-cart";
            this.element = cartContainer;
        }

        show() {
            if (document.getElementById(this.element.id) === null) {
                document.body.appendChild(this.element);
            }
            this.render();
        }

        hide() {
            if (document.getElementById(this.element.id) !== null) {
                document.body.removeChild(this.element);
            }
        }

        deleteQuote(quote) {
            const storage = read_storage();
            storage.deleteQuote(quote);
            write_storage(storage);
            this.render();
        }

        render() {
            const storage = read_storage();
            const currentUrl = getCurrentUrl();

            // Erase existing content
            this.element.innerHTML = "";

            // Add title
            const title = document.createElement("h1");
            title.innerHTML = "Create NanoPub";
            this.element.appendChild(title);

            // Add quotes
            const cartQuoteList = storage.quote_list.map(q => new CartQuote(q));
            let currentSource = null;
            for (const cartQuote of cartQuoteList) {
                if (currentSource != cartQuote.quote.source) {
                    const subtitle = document.createElement("h2");
                    subtitle.innerHTML = cartQuote.quote.source;
                    if (cartQuote.quote.source === currentUrl) {
                        subtitle.className = "current";
                    }
                    this.element.appendChild(subtitle);
                    currentSource = cartQuote.quote.source;
                }
                this.element.appendChild(cartQuote.element);
            }

            // Add assertion input field
            const assertionInput = document.createElement("input");
            assertionInput.value = storage.assertion;
            assertionInput.className = "assertion";
            assertionInput.placeholder = "Assertion";
            assertionInput.addEventListener("input", function (e) {
                let storage = read_storage();
                storage.assertion = this.value;
                write_storage(storage);
            });
            this.element.appendChild(assertionInput);

            // Add Create NanoPub button
            const btnCreate = createButton("Create NanoPub");
            function openCreateNanoPub() {
                publishNanoPub(read_storage(), AUTH_TOKEN);
            }
            btnCreate.onclick = openCreateNanoPub;
            this.element.appendChild(btnCreate);

            // Add Cancel button
            const btnCancel = createButton("Cancel");
            function cancelNanoPub() {
                const storage = read_storage();
                storage.removeAllQuotes();
                write_storage(storage);
                CART.hide();
            }
            btnCancel.onclick = cancelNanoPub;
            this.element.appendChild(btnCancel);
        }
    }

    const CART = new Cart();

    function getdoi_europepmc() {
        let elt = document.querySelector('.doi a');
        if (elt === null) {
            elt = document.getElementById('article--doi--link-metadataSec');
        }
        if (elt === null) {
            return null;
        }
        return elt.href;
    }

    function getdoi_ncbi() {
        return document.querySelector('.doi a').href;
    }

    function getdoi_scienceorg() {
        return document.querySelector('.doi a').href;
    }

    function getdoi_nature() {
        return document.querySelector('.c-bibliographic-information__value').href;
    }

    //
    const URL_MAPPING = {
        "https://europepmc.org/article/PMC/": getdoi_europepmc,
        "https://europepmc.org/abstract/MED/": getdoi_europepmc,
        "https://www.ncbi.nlm.nih.gov/pubmed/": getdoi_ncbi,
        "https://www.science.org/doi/": getdoi_scienceorg,
    }

    const btnAddQuote = createButton("➕ Add Quote");

    const createContainer = document.createElement('div');
    createContainer.id = "nanopub-elixir-biohackaton-project26-selection";
    createContainer.appendChild(btnAddQuote);

    // dynamically load when the user wants to create a new nanopublication
    const { generateFragment } = await import('https://unpkg.com/text-fragments-polyfill/dist/fragment-generation-utils.js');

    function getDoiUrl(url) {
        for (const [startUrl, get_doi] of Object.entries(URL_MAPPING)) {
            if (url.startsWith(startUrl)) {
                const doi_url = get_doi();
                if (doi_url != null) {
                    return doi_url;
                }
                return url;
            }
        }
        return url;
    }

    function getCurrentUrl() {
        let url = `${location.origin}${location.pathname}${location.search}`;
        return getDoiUrl(url);
    }

    function createSourceAndSelector() {
        const result = generateFragment(window.getSelection());
        if (result.status !== 0) {
            return null;
        }
        const source = getCurrentUrl();

        const fragment = result.fragment;
        const prefix = fragment.prefix ? `${encodeURIComponent(fragment.prefix)}-,` : '';
        const suffix = fragment.suffix ? `,-${encodeURIComponent(fragment.suffix)}` : '';
        const start = encodeURIComponent(fragment.textStart);
        const end = fragment.textEnd ? `,${encodeURIComponent(fragment.textEnd)}` : '';
        return {
            source: source,
            selector: {
                type: "TextQuoteSelector",
                prefix: prefix,
                exact: start + end,
                suffix: suffix,
            }
        }
    }

    function read_storage() {
        let storage = GM_getValue("storage");
        if (storage === undefined) {
            return new NanoPub([], "");
        }
        return NanoPub.fromJSON(storage)
    }

    function write_storage(storage){
        GM_setValue("storage", storage.toJSON());
    }

    function showBtnCreate(selection) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        createContainer.style.top = (window.scrollY + rect.bottom + 16) + 'px';
        createContainer.style.left = (window.scrollX + rect.left) + 'px';

        function addQuote() {
            let storage = read_storage();
            const {source, selector} = createSourceAndSelector();
            storage.addQuote(source, selector);
            write_storage(storage);
            CART.show();
        }
        btnAddQuote.onclick = addQuote;

        if (document.getElementById(createContainer.id) === null) {
            document.body.appendChild(createContainer);
        }
    }

    function hideBtnCreate() {
        if (document.getElementById(createContainer.id) !== null) {
            document.body.removeChild(createContainer);
        }
    }

    function checkShowBtnCreate() {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            showBtnCreate(selection);
        } else {
            hideBtnCreate();
        }
    }

    // Add an event listener to the document to listen for the user selecting text.
    document.addEventListener('mouseup', checkShowBtnCreate);
    document.addEventListener('keyup', checkShowBtnCreate);

    window.addEventListener("selectstart", () => {
        hideBtnCreate();
    });

    window.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            hideBtnCreate();
        }
    });

    // let a = read_storage();
    // a.removeAllQuotes();
    // write_storage(a);

    if (! read_storage().isEmpty()) {
        CART.show();
    }
})();