Add an eBioDiv link to the GBIF occurrence page using a Firefox extension and a Javascript:

![image](https://user-images.githubusercontent.com/1594191/195654354-f0a1c359-1f0a-45df-933b-f79d4e1ee737.png)

## Installation
* Install Tampermonkey:
    * For [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
    * For [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    * Other browser see <https://www.tampermonkey.net/>
* Follow this link <https://raw.githubusercontent.com/MetabolicAtlas/biohackathon23/main/browser_extension/annotations_to_nanopub.js>
* Tampermonkey will show a popup to install the script
* Click on the "Install" button

## Usage

On:
* https://europepmc.org/article/
* https://www.ncbi.nlm.nih.gov/pubmed/
* https://www.nature.com/articles/

When you select some text, a button appears:

![Add_quote](add_quote.png)

When clicked, a cart appears at the bottom right of the screen:

![Cart](cart.png)

You can make multiple selection:

![Cart - multiple quote](cart-multiple-quote.png)

You can add quotes from multiple documents (the extension keeps your cart across the pages):

![Cart - multiple document](cart-multiple-document.png)

Enter the assertion, and when ready, you can click on "Create NanoPub", the browser is going to open a new tab automatically.

<https://np.petapico.org/RARpP8Q4RqW3uLUb2pT2C-zlwSofhvwfsXveK5-ccLq4k>
