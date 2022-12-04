# 🚀 CrowdLabel ($CROL)
<span style="background: rgb(122,184,226);
background: linear-gradient(90deg, rgba(122,184,226,1) 0%, rgba(235,20,26,1) 100%); font-size: 17px;   -webkit-text-fill-color: transparent;   -webkit-background-clip: text;
">Powering the Next Generation ML Tasks: Decentralized Distributed Labeling Platform</span>
# Overview
This project leverages the power of the community to crowdsource images from 1) various domains and 2) diverse groups. Users now have a monetary incentive to share images that are relevant and have high demand.
Several industries have yet to reap the benefits of Machine Learning due to limited access to high-quality data and technical human resources.
Currently, there is active research in both industry and academia regarding generic human-level tasks.
However, limited quality data in expert domains, i.e. healthcare and industrial applications, hinders ML application.
With this platform, hospitals can now securely pool CT scans of lung cancer patients and crowdsource expert labelers with domain knowledge to prepare ML training data at scale.
Another issue is that data skews can cause bias in deployed models, an issue that has received increased attention lately.
Crowdsourcing from a diverse group of racial and ethnic groups that reflect different cultures thought, and interest can provide balanced datasets that equally represents diversity.

## Crowdsource Labelers
This platform makes it easier to crowdsource labelers from expert domains.
Labelers are now incentivized to participate in their free time to earn token rewards by pooling expert knowledge into the platform.
A group of doctors can participate to label lung cancer patients' CT scans or x-ray images.
Also, manufacturing industry QA engineers can participate to label products with defects.
Anyone with a wallet address can join immediately without complicated authentication procedures.
The quality of labelers is algorithmically determined by monitoring performance based on the ground-truth overlap.
The platform uses a native algorithm inspired by reCAPTCHA to vote on a correct label.
With preliminary rounds based on pre-labeled data, users are asked to label in a domain-specific task.
Only users above a certain Intersect Over Union (IOU) score will be allowed to participate in labeling tasks related to the domain.
Future labeling rewards will depend on the IOU score of all labels from other experts.
Users with high accuracy will have boosted voting power, which incentivizes them to maintain high accuracy.
This way, individual incentive ensures label quality instead of centralized human-in-the-loop quality assurance.

## Data Privacy and Ownership
With this platform, users can now opt-in (at will) to monetize data (instead of opting out from web2 services) and track ownership of their data by browsing the chain.
Uploaded user images will generate unique hashes that will be included in the transaction of a dataset purchase from an organization or company.
If an image is included in the purchased dataset and used in multiple training iterations, the user will be fully compensated and aware of the use.

## Demand Side
Companies can now tap into crowdsourced high-quality labeled datasets from diverse domains and underrepresented groups.
Also, in industry settings, acquiring licensing is often complicated and many sensitive data privacy requirements delay deployment.
With this platform, companies can make dataset purchases with tokens and use crowdsourced data for commercially deployed models.
Hopefully, companies can also create consortiums on top of this platform to share and crowdsource high-quality data with other industry players.

# Architecture

## Acknowledgements


## Development Notes
1. Running IPFS Daemon.
```bash
# resolve cors issue
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
ipfs daemon
```
2. [Optional] Run directly with deterministic (persistent address) Ganache.
```bash
ganache-cli -d
```
3. [Preferred] Run with hardhat.
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```




## Authors
- `Hojae Yoon (hy2714)`
- `Harry Lee (jl5271)`
- `Seong Moon Jo (sj3014)`
