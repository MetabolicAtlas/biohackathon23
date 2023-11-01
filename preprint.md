---
title: 'BioHackEU23 report: Template for the very long title'
title_short: 'BioHackEU23 #26: unknown chemical substances'
tags:
  - cheminformatics
  - PubChem
authors:
  - name: First Author
    affiliation: 1
  - name: Last Author
    orcid: 0000-0000-0000-0000
    affiliation: 2
affiliations:
  - name: First Affiliation
    index: 1
  - name: Second Affiliation
    index: 2
date: 8 November 2023
cito-bibliography: paper.bib
event: BH23EU
biohackathon_name: "BioHackathon Europe 2023"
biohackathon_url:   "https://biohackathon-europe.org/"
biohackathon_location: "Barcelona, Spain, 2023"
group: Project 26
# URL to project git repo --- should contain the actual paper.md:
git_url: https://github.com/biohackrxiv/publication-template
# This is the short authors description that is used at the
# bottom of the generated paper (typically the first two authors):
authors_short: First Author \emph{et al.}
---

# Introduction

URL text fragments allow you to link to a specific section of or selection in a web page by extending the URL of said web page. These extended URLs allow you to deep link to content within a page, rather than just linking to the top. This can be useful for linking directly to relevant information. When clicking on a link with a URL text fragment, the page will jump to the correct position without the need to reload the entire page. URL text fragments do not change the content of the URL, just the scroll position on load. The URL with and without the fragment references the same resource. Browser support is excellent as all major browsers support URL fragments. Ultimately, URL text framents allow for deeper linking within web pages.

Nanopublications are a way to publish scientific data and claims in a granular and machine-readable format. They are tiny units of publishable information, typically making a single scientific claim backed by data and provenance. Each nanopublication has a formal structure with three parts - the assertion, provenance, and publication information. This allows them to be machine-readable and makes it easier to verify claims. Nanopublications are designed to be conceptually small, so that many nanopublications together can precisely capture the full context and complexity of scientific research. They use semantic web standards like RDF to represent the relationships between concepts, allowing nanopublications to be integrated and reasoned over. Nanopublications can be (? I thought this was a must) cryptographically signed and assigned persistent identifiers to create a traceable record. The decentralized and granular nature allows individual nanopublications to be easily shared, cited, reused, retracted, etc. In summary, nanopublications provide a way to formally publish small data-backed claims that is designed to integrate with the semantic web and amplify the precision and transparency of scientific communication.

Researchers are exploring nanopublications for improving reproducibility, attribution, and discovery in science.

# Technical implementation

Rely on text fragment specification:
* [Specification](https://wicg.github.io/scroll-to-text-fragment/)
* [Supported by Chrome and Safari](https://caniuse.com/?search=text%20fragment)
* [Supported by Firefox with an extension](https://addons.mozilla.org/en-US/firefox/addon/link-to-text-fragment/). Firefox should support the specification in the next versions.

Other references:
* [BioC API for PMC](
https://www.ncbi.nlm.nih.gov/research/bionlp/APIs/BioC-PMC/)


## Nanopublications specification

### Human-readable specification


##### Assertion
- This assertion has the free-text comment: "if needed, some explanation or conclusiobn or a link to a database" \[optional]
- This assertion has the the evidence type (ECO code): API-populated dropdown, probably default to "author statement" or "curator inference" \[optional]

##### Provenance
- The assertion above is attributed to: one or more ORCiDs (who can be different from the Nanopub author, similar to a review process)
- The assertion above is based on (maybe this should be an assertion) (the example below is for 1 single entry)
    Required:
    - text fragment (suffix)
    - text excerpt (fair use)
    - DOI
    
    Optional:
    - BioC-style offset-based URL from a resource like PubAnnotation or SIBiLS


##### Publication info
- This nanopublication is created by: ORCiD
- This nanopublication is published under the license: CC-BY 4.0



### Dilemmas

Is the Nanopublication template going to include a link to the database or database entry?

# Formatting

This document use Markdown and you can look at [this tutorial](https://www.markdowntutorial.com/).

## Subsection level 2

Please keep sections to a maximum of only two levels.

## Tables and figures

Tables can be added in the following way, though alternatives are possible:

Table: Note that table caption is automatically numbered and should be
given before the table itself.

| Header 1 | Header 2 |
| -------- | -------- |
| item 1 | item 2 |
| item 3 | item 4 |

A figure is added with:

![Caption for BioHackrXiv logo figure](./biohackrxiv.png)

# Other main section on your manuscript level 1

Lists can be added with:

1. Item 1
2. Item 2

# Citation Typing Ontology annotation

You can use [CiTO](http://purl.org/spar/cito/2018-02-12) annotations, as explained in [this BioHackathon Europe 2021 write up](https://raw.githubusercontent.com/biohackrxiv/bhxiv-metadata/main/doc/elixir_biohackathon2021/paper.md) and [this CiTO Pilot](https://www.biomedcentral.com/collections/cito).
Using this template, you can cite an article and indicate _why_ you cite that article, for instance DisGeNET-RDF [@citesAsAuthority:Queralt2016].

The syntax in Markdown is as follows: a single intention annotation looks like
`[@usesMethodIn:Krewinkel2017]`; two or more intentions are separated
with colons, like `[@extends:discusses:Nielsen2017Scholia]`. When you cite two
different articles, you use this syntax: `[@citesAsDataSource:Ammar2022ETL; @citesAsDataSource:Arend2022BioHackEU22]`.

Possible CiTO typing annotation include:

* citesAsDataSource: when you point the reader to a source of data which may explain a claim
* usesDataFrom: when you reuse somehow (and elaborate on) the data in the cited entity
* usesMethodIn
* citesAsAuthority
* citesAsEvidence
* citesAsPotentialSolution
* citesAsRecommendedReading
* citesAsRelated
* citesAsSourceDocument
* citesForInformation
* confirms
* documents
* providesDataFor
* obtainsSupportFrom
* discusses
* extends
* agreesWith
* disagreesWith
* updates
* citation: generic citation



# Results


# Discussion

...

## Acknowledgements

...

## References