---
title: 'BioHackEU23 report: Project 26: Literature Biocuration Practices and Guidelines'
title_short: 'BioHackEU23 #26: unknown chemical substances'
tags:
  - cheminformatics
  - PubChem
authors: # all people in the google doc + Vincent
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
git_url: https://github.com/MetabolicAtlas/biohackathon23
# This is the short authors description that is used at the
# bottom of the generated paper (typically the first two authors):
authors_short: First Author \emph{et al.}
---

# Abstract

Researchers are exploring nanopublications for improving reproducibility, attribution, and discovery in science.

# Introduction

Biocuration involves the synthesis, integration, and standardization of data from published literature into structured databases and knowledgebases. This facilitates computational analysis and allows scientific discoveries to be built upon. A critical component of biocuration is linking evidentiary statements to their source articles. However, rather than simply citing whole articles, increased value can be realized by pointing to specific textual evidence within articles. This more granular approach offers numerous potential benefits that have yet to be fully realized. 

The aim of this paper is to delineate the advantages of biocurators referring to precise sentence-level evidence within articles rather than broadly citing entire articles. We postulate this will enhance accuracy, verifiability, updatability, findability, efficiency, text mining capability, and downstream usage. Here we review the current state of biocuration evidencing approaches and present the case for transitioning to more targeted, sentence-level referencing. We also quantify potential impacts this could have on biocuration accuracy, speed, and cost. Ultimately, we demonstrate the significant advantages sentence-level biocuration evidencing provides and propose solutions to overcome existing barriers to its widespread adoption. This will assist biocurators in maximizing the reliability and utility of the structured knowledge they generate.

# Landscape analysis

Standards
* [BioC](https://bioc.sourceforge.net/)
* [JATS](https://www.niso.org/standards-committees/jats)
* [WADM](https://www.w3.org/TR/annotation-model/)

Resources and tools
* [PubAnnotations](https://pubannotation.org/)
* [SIBiLS](https://sibils.text-analytics.ch/)
* [BioC API for PMC](
https://www.ncbi.nlm.nih.gov/research/bionlp/APIs/BioC-PMC/) and [SimpleBioC](https://github.com/dongseop/simple_bioc)
* [Hypothes.is](https://web.hypothes.is/)
* [TeamTat](https://www.teamtat.org/)
* [brat rapid annotation tool](http://brat.nlplab.org/index.html)
* [Annotator](https://github.com/openannotation/annotator)

# Example use-cases

Databases can have different requirements for referencing to specific text fragments in a publication dependent on the structure of a database entry and how annotations are added and referenced within the database. 

#### IMEx

> The [IMEx database](http://www.imexconsortium.org/) is focussing on protein-protein interaction data extracted from publications and preprints or directly submitted to the database. Manual curation of protein-protein interactions which are experimentally demonstrated in a publication includes the citation of the corresponding sentence in the database entry. For full-text publications the annotation to the sentences are added in [EuropePMC](https://europepmc.org/). The evidence for an interaction stored in the database is based on one or more publications.

#### Metabolic Atlas

> [Metabolic Atlas](https://metabolicatlas.org/) is collecting open-source genome-scale metabolic models including associations between reactions and genes. Currently, associations are extracted manually by curators and references are given to the paper. As part of the curation process the annotation of gene associations and gene rules to specific small parts of the publication would improve the findability of the corresponding information in the publication. The evidence for an interaction stored in the database is based on one or more publications.

#### SABIO-RK

> [SABIO-RK](https://sabiork.h-its.org/) is a manually curated database for biochemical reactions and their kinetic properties. Data are mainly manually extracted from literature. One database entry is referring to one publication, and one publication can produce more than one database entry. The content of a database entry (e.g. kinetic data, reaction participants, proteins, organism, temperature, pH) is highly distributed in different sections of a publication. Currently a database entry includes the overall publication as reference. The findability of the corresponding information on a sentence-level in the publication would guide database users and curators directly to the exact locations of all data of the entry.  

#### DisProt

> [DisProt](https://disprot.org/) is a manually curated repository of Intrinsically Disordered Proteins. Each entry includes information about the corresponding literature reference along with relevant statements from the manuscript (when available), curator statements and cross references.
Currently DisProt entries could contain manually added free text statements extracted from a publication and would benefit from a sentence-level reference.

#### TogoMedium

> [TogoMedium](http://togomedium.org/) is a database focused on culture media for microorganisms. The media available in TogoMedium have been compiled from information provided by diverse bioresource centers and research papers. Data about the microbiome (e.g. scientific organism names and strains), corresponding medium (including compositions) and environmental conditions (e.g. temperature, pH, lng/lat) are extracted from literature. 

####  BioSamples

> use case

# Technical implementation

The technical implementation of our proposal relies on combining two existing technologies: URL text fragments and Nanopublications.

URL text fragments allow you to link to a specific section of or selection in a web page by extending the URL of said web page. These extended URLs allow you to deep link to content within a page, rather than just linking to the top. This can be useful for linking directly to relevant information. When clicking on a link with a URL text fragment, the page will jump to the correct position without the need to reload the entire page. URL text fragments do not change the content of the URL, just the scroll position on load. The URL with and without the fragment references the same resource. Browser support is excellent as all major browsers support URL fragments. Ultimately, URL text framents allow for deeper linking within web pages.

Nanopublications are a way to publish scientific data and claims in a granular and machine-readable format. They are tiny units of publishable information, typically making a single scientific claim backed by data and provenance. Each nanopublication has a formal structure with three parts - the assertion, provenance, and publication information. This allows them to be machine-readable and makes it easier to verify claims. Nanopublications are designed to be conceptually small, so that many nanopublications together can precisely capture the full context and complexity of scientific research. They use semantic web standards like RDF to represent the relationships between concepts, allowing nanopublications to be integrated and reasoned over. Nanopublications can be (? I thought this was a must) cryptographically signed and assigned persistent identifiers to create a traceable record. The decentralized and granular nature allows individual nanopublications to be easily shared, cited, reused, retracted, etc. In summary, nanopublications provide a way to formally publish small data-backed claims that is designed to integrate with the semantic web and amplify the precision and transparency of scientific communication.

* [Specification](https://wicg.github.io/scroll-to-text-fragment/)
* [Supported by Chrome and Safari](https://caniuse.com/?search=text%20fragment)
* [Supported by Firefox with an extension](https://addons.mozilla.org/en-US/firefox/addon/link-to-text-fragment/). Firefox should support the specification in the next versions.

## Proof of concept

### Browser extension

### Web application

Text fragment URLs can be generated as part of web applications which display publications. Within a search and reading tool for biocurators, we added a feature for generating text fragment URLs for user highlighted text. Text fragments can be trivially formatted using JavaScript.

https://gitlab.ebi.ac.uk/mjj/biocuration-toolbox/-/commit/4c63c75fbd69181e99f017289285a7ceb740217a

## Human-readable Nanopublications specification


#### Assertion
- This assertion has the free-text comment: "if needed, some explanation or conclusion or a link to a database" \[optional]
- This assertion has the evidence type (ECO code): API-populated dropdown, probably default to "author statement" or "curator inference" \[optional]

#### Provenance
- The assertion above is attributed to: one or more ORCiDs (who can be different from the Nanopub author, similar to a review process)
- The assertion above is based on (maybe this should be an assertion) (the example below is for 1 single entry)
    Required:
    - text fragment (suffix)
    - text excerpt (fair use)
    - DOI
    
    Optional:
    - BioC-style offset-based URL from a resource like PubAnnotation or SIBiLS

#### Publication info
- This nanopublication is created by: ORCiD
- This nanopublication is published under the license: CC-BY 4.0

## SWOT analysis

### Strengths

- URL text fragments work on any domain
- Text fragments do not assume the structure of the document, and are portable across different presentations of the same publication (eg, on PubMed Central, on a journal website, and an OCR scan of a printed journal)
- The fair use of the text makes the evidence easily accessible
- Works with non-OA journals
- Nanopubs can be used by other databases
- All Nanopubs for a given DOI can be collected to generate a new type of metric that complements the existing citation metrics
- All Nanopubs for a given OA article can be overlaid by a resource like EuropePMC
- The crediting of the biocurator is open, and can be aggregated by resources such as APICURON

## Weaknesses

- Harder to reject/supersede Nanopublications than just updating a PMID
- Hard/impossible to handle content other than text: images, tables, binary files, supplementary materials

### Opportunities

- Is the Nanopublication template going to include a link to the database or database entry?

## Threats

- Robustness/longevity of the Nanopublications network


# Results


# Discussion

Different approaches are facilitated: one Nanopub per DOI vs one Nanopub for multiple fragments across multiple DOIs.


## Acknowledgements

SA Marseille

## References


### Citation Typing Ontology annotation

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
