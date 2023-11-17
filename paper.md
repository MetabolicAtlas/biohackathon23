---
title: 'BioHackEU23 report: Literature Biocuration Practices and Guidelines'
title_short: 'BioHackEU23 #26: Granular Biocuration'
tags:
  - biocuration
  - PubChem
authors: # alphabetical order for now
  - name: Mihail Anton
    orcid: Anton 0000-0002-7753-9042
    affiliation:
  - name: Adel Bouhraoua
    orcid: 
    affiliation:
  - name: Vincent Emonet
    orcid: 
    affiliation: 
  - name: Alexandre Flament
    orcid: 
    affiliation: 
  - name: Matt Jeffryes
    orcid: 
    affiliation: 
  - name: Toshiaki Katayama
    orcid: 
    affiliation: 
  - name: Luana Licata
    orcid: 
    affiliation: 
  - name: Patrick Ruch
    orcid:
    affiliation: 
  - name: Egon Willighagen
    orcid: 
    affiliation: 
  - name: Ulrike Wittig
    orcid: 
    affiliation: 
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
git_url: https://github.com/MetabolicAtlas/biohackathon23
# This is the short authors description that is used at the
# bottom of the generated paper (typically the first two authors):
authors_short: First Author \emph{et al.}
---

# Abstract
- [ ] Luana, could you try to draft an abstract

Here, we are exploring the use of nanopublications and URL text fragments for improving reproducibility, attribution, and discovery in science.

# Introduction

Biocuration involves the synthesis, integration, and standardization of data from published literature into structured databases and knowledgebases. This facilitates computational analysis and allows scientific discoveries to be built upon. A critical component of biocuration is linking evidentiary statements to their source articles. However, rather than simply citing whole articles, increased value can be realized by pointing to specific textual evidence within articles. This more granular approach offers numerous potential benefits that have yet to be fully realized. 

The aim of this paper is to delineate the advantages of biocurators referring to precise sentence-level evidence within articles rather than broadly citing entire articles. We postulate this will enhance accuracy, verifiability, updatability, findability, efficiency, text mining capability, and downstream usage. Here we review the current state of biocuration evidencing approaches and present the case for transitioning to more targeted, sentence-level referencing. We also quantify potential impacts this could have on biocuration accuracy, speed, and cost. Ultimately, we demonstrate the significant advantages sentence-level biocuration evidencing provides and propose solutions to overcome existing barriers to its widespread adoption. This will assist biocurators in maximizing the reliability and utility of the structured knowledge they generate.

# Landscape analysis of literature biocuration

## Standards

#### BioC 

BioC aims to enable interoperability between biomedical natural language processing tools and text mining systems [@citesAsAuthority:sourceforgeBioCProject]. The format consists of two components - passages and annotations. Passages represent original texts, while annotations capture meta-information about entities or relations within texts. BioC adopts a minimalist approach, only including core elements required for basic text processing. The simple generic structure allows BioC to represent annotations from most biomedical text mining systems. BioC annotations can link to ontologies and terminologies via identifiers. While this format is originally XML-based, JSON implemenations exist, see [BioC-JSON](https://github.com/ncbi-nlp/BioC-JSON), [BioC API for PMC](
https://www.ncbi.nlm.nih.gov/research/bionlp/APIs/BioC-PMC/) and [SimpleBioC](https://github.com/dongseop/simple_bioc). Overall, BioC provides a lightweight interchange format to facilitate integration of heterogeneous biomedical text processing components.

#### JATS
The Journal Article Tag Suite ([JATS](https://www.niso.org/standards-committees/jats)) is another XML format used for representing scholarly journal articles. JATS was co-developed by National Center for Biotechnology Information (NCBI) of the National Library of Medicine (NLM) as an archiving and interchange standard for scientific literature. It provides a set of XML elements and attributes for describing all aspects of journal articles, including text, images, and supplemental data. A key goal of JATS is to facilitate digital preservation, open access, and semantic enrichment of journal literature. JATS has been widely adopted by publishers, archives, and repositories as a journal format. Shortly, JATS serves as a comprehensive model for encoding, managing, and publishing journal articles using XML.

#### WADM

- [ ] Alexandre, could you present in a short paragraph the relevancy of WAMD for biocuration

[WADM](https://www.w3.org/TR/annotation-model/)

## Resources and tools

#### SIBiLS

- [ ] Patrick, please verify the description of the resource

[SIBiLS](https://sibils.text-analytics.ch/) offers customizable RESTful search interfaces built on Elasticsearch. It enriches literature results with biomedical concepts from ontologies like MeSH automatically mapped to text via named entity recognition. This allows literature searches to incorporate semantic knowledge in the biomedical domain. Users can configure search engines for different use cases by selecting ontologies, defining keywords, and customizing mappings. The services support features like autocomplete, highlighted snippets, and contextual recommendations. Overall, SIBiLS demonstrates the value of semantically enriched literature search through automatically linking unstructured text with formal conceptual knowledge. This improves discovery of relevant biomedical publications by overcoming limitations of keyword searches lacking domain context.

#### PubAnnotation

- [x] Toshiaki, thank you for providing this

[PubAnnotation](https://pubannotation.org/) functions as a repository of annotations, and the coordinates of these annotations are automatically aligned with the canonical text, enabling users to share, search, and compare annotations. It also offers a visual editor for creating annotations and REST APIs for retrieving annotations in a JSON format. The service assigns a globally unique identifier in the form of a URI to any text segment within the literature on PubMed or PMC. This makes it suitable for use in RDF, allowing users to precisely reference specific regions in a paper for annotation.  Annotations in the BioC format can be converted to PubAnnotation's JSON using the [SimpleBioC](https://github.com/dongseop/simple_bioc) converter. Integration of the JATS document structure is currently in progress. In the future, an API that returns the JATS section corresponding to a given annotation URI is planned. Additionally, annotations will be enhanced with RDF, including Nanopublication, to allow for the storage and retrieval of supplementary information.

- [ ] it would be great if someone could volunteer to provide descriptions of these resources (possibly shorter than the ones above)

* [Hypothes.is](https://web.hypothes.is/)
* [TeamTat](https://www.teamtat.org/)
* [brat rapid annotation tool](http://brat.nlplab.org/index.html)
* [Annotator](https://github.com/openannotation/annotator)

### EuropePMC

- [ ] Matt, could you add a paragraph on the resource, also mentioning SciLite Annotations

# Example use-cases for granular biocuration

- [x] Thank you Ulrike for putting together this section

Life science databases can have different requirements for referencing to specific text fragments in a publication dependent on the structure of a database entry and how annotations are added and referenced within the database. 

#### IMEx

> The [IMEx database](http://www.imexconsortium.org/) is focussing on protein-protein interaction data extracted from publications and preprints or directly submitted to the database. Manual curation of protein-protein interactions which are experimentally demonstrated in a publication includes the citation of the corresponding sentence in the database entry. For full-text publications the annotation to the sentences are added in [EuropePMC](https://europepmc.org/). The evidence for an interaction stored in the database is based on one or more publications.

#### Metabolic Atlas

> [Metabolic Atlas](https://metabolicatlas.org/) is collecting open-source genome-scale metabolic models including associations between reactions and genes. Currently, associations are extracted manually by curators and references are given to the paper. As part of the curation process the annotation of gene associations and gene rules to specific small parts of the publication would improve the findability of the corresponding information in the publication. The evidence for an interaction stored in the database is based on one or more publications.

#### SABIO-RK

> [SABIO-RK](https://sabiork.h-its.org/) is a manually curated database for biochemical reactions and their kinetic properties. Data are mainly manually extracted from literature. One database entry is referring to one publication, and one publication can produce more than one database entry. The content of a database entry (e.g. kinetic data, reaction participants, proteins, organism, temperature, pH) is highly distributed in different sections of a publication. Currently, a database entry includes the overall publication as reference. The findability of the corresponding information on a sentence-level in the publication would guide database users and curators directly to the exact locations of all data of the entry.  

#### DisProt

> [DisProt](https://disprot.org/) is a manually curated repository of Intrinsically Disordered Proteins. Each entry includes information about the corresponding literature reference along with relevant statements from the manuscript (when available), curator statements and cross references.
Currently, DisProt entries could contain manually added free text statements extracted from a publication and would benefit from a sentence-level reference.

#### TogoMedium

> [TogoMedium](http://togomedium.org/) is a database focused on culture media for microorganisms. The media available in TogoMedium have been compiled from information provided by diverse bioresource centers and research papers. Data about the microbiome (e.g. scientific organism names and strains), corresponding medium (including compositions) and environmental conditions (e.g. temperature, pH, lng/lat) are extracted from literature. 

####  BioSamples

> To annotate metagenome assemblies (MAGs), cell lines, etc. it would be useful to extract structured information from metadata in the BioSamples database written in free text. Many attributes are only written in the description or in the BioProject metadata. 

# Technical implementation

The technical implementation of our proposal relies on combining two existing technologies: URL text fragments and Nanopublications.

URL text fragments allows the linking of a specific section of or selection in a web page by extending the URL of said web page. These extended URLs enable one to deep link to content within a page, rather than just linking to the top. This can be useful for linking directly to relevant information. When clicking on a link with a URL text fragment, the page will jump to the correct position without the need to reload the entire page. URL text fragments do not change the content of the URL, just the scroll position on load. The URL with and without the fragment references the same resource. As all major browsers support URL fragments, Browser support is excellent [@citesAsAuthority:caniuseTextFragment]. Ultimately, URL text framents allow for deeper linking within web pages.

- [ ] Vincent, could you proof the paragraph below

Nanopublications are a way to publish scientific data and claims in a granular and machine-readable format. They are tiny units of publishable information, typically making a single scientific claim backed by data and provenance. Each nanopublication has a formal structure with three parts - the assertion, provenance, and publication information. This allows them to be machine-readable and makes it easier to verify claims. Nanopublications are designed to be conceptually small, so that many nanopublications together can precisely capture the full context and complexity of scientific research. They use semantic web standards like RDF to represent the relationships between concepts, allowing nanopublications to be integrated and reasoned over. Nanopublications can be (? I thought this was a must) cryptographically signed and assigned persistent identifiers to create a traceable record. The decentralized and granular nature allows individual nanopublications to be easily shared, cited, reused, retracted, etc. In summary, nanopublications provide a way to formally publish small data-backed claims that is designed to integrate with the semantic web and amplify the precision and transparency of scientific communication.

* [Specification of URL text fragments](https://wicg.github.io/scroll-to-text-fragment/)

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



# Proof of concept

### Browser extension

- [ ] Alexandre, could you provide a description of how this the proof of concept works, possibly inspired by the Readme you wrote

### Web application

- [ ] Matt, I think this is where your project comes in, could you  provide a short description of it

Text fragment URLs can be generated as part of web applications which display publications. Within a search and reading tool for biocurators, we added a feature for generating text fragment URLs for user highlighted text. Text fragments can be trivially formatted using JavaScript.



# Discussion: a SWOT analysis

- [ ] Ulrike and Patrick, could you see that this section is complete

### Strengths

URL text fragments work on any domain. They do not assume the structure of the document, and are portable across different websites presenting the same publication, e.g., on PubMed Central, on EuropePMC, and on a journal website.

Moreover, leveraging this disjoint nature of the text fragment from the source website, annotations can be produced as long as the biocurator has access to the journal article. Our approach is thus compatible with non-OA journals.

Nanopublications are stored in a publicly-available, distributed way. Therefore, as soon as an annotation is made available through a nanopublication, it can be used by any database. Moreover, crediting databases such as APICURON can easily and openly collect the biocuration metrics. In this way, the curation work becomes reusable according to FAIR principles.

## Weaknesses

- Harder to reject/superseed Nanopublications than just updating a PMID
- Hard/impossible to handle content other than text: images, tables, binary files, supplementary materials

### Opportunities

One potential outcome of our proposal is the creation of a new type of impact metric. To our knowledge, citations are counted only when a written piece of text refers to a publication. Our proposed solution would make it possible to identify all the annotations that an article has produced, possibly even including the databases that use said annotations. These metrics could expand the current concept of citation metrics.

Different approaches are facilitated: one Nanopub per DOI vs one Nanopub for multiple fragments across multiple DOIs.

- Is the Nanopublication template going to include a link to the database or database entry?
- A Nanopublication template could be used for pdf files for copy/paste text fragments

## Threats

A key component of our proposal is the robustness andlongevity of the nanopublications network. We believe the distributed nature of this infrastrucure is more robust than a centralised one, which would otherwise present a single point of failure. At the same time, the fundamental question of long-term sustainability remains.

Another key composeneent of our proposal is the fair use of text copied from the publications. To our knowledge, there are currently no formal limitations. However, we can foresee that there ought to be restrictions in terms of fragment length. Moreover, one can imagine a scenario where a large amount of overlapping text fragments could lead to essentially making avaiable most of the text of an article that is not open-access.



# Conclusions




# Acknowledgements

We thank Gavin Chait for the discussions on annotation tools. This work was supported by ELIXIR, the research infrastructure for life-science data.



# References

- [ ] Adel, could you attempt to fix fix references by replacing the in-text URLs with [CiTO annotations](https://sparontologies.github.io/cito/current/cito.html)
