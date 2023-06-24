//  get content from Cross Ref
// replace `yourDOI` with the DOI of the article you're interested in
let doi = "yourDOI";
async function getCrossRef(doi) {
  let response = await fetch('https://api.crossref.org/works/' + doi);
  let data = await response.json();
  return data;
}
