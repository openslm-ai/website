# The Open Small Models Accord

*On open, accessible, and correctable AI for the next decade*

**Version 0.1 (draft) · Issued 6 April 2026**

The accord is a dated document. Its claims about openness are stated as of the issue date above. Subsequent versions update the snapshot.

**Preamble**

The open systems that run modern computing (operating systems, browsers, internet protocols, the toolchains that make software portable) share a single condition. The substrate has to remain modifiable by the people who depend on it. AI will be built either as inspectable infrastructure or as opaque services, and the choice is being made now.

This document sets out principles we believe are necessary for small language models, and the systems that run them, to be open in a meaningful sense. The principles are compatible with existing open source standards and with public-benefit technology traditions. Researchers, model developers, infrastructure providers, civil society organizations, enterprises, and standards bodies should be able to endorse them without contradicting the work they already do.

Endorsement signals agreement with the direction, and a commitment to move toward it in practice. It is not a claim of completion.

## 1. Small models are where openness, accessibility, and accountability can actually meet

Frontier AI systems are now built at a scale that puts full openness beyond the reach of anyone outside a handful of firms. Training a frontier model requires compute, data, and operational resources that no university, civil society organization, or public institution can assemble. Open weights released from these models are useful, but they are not the same thing as open systems, because the people who receive them cannot reproduce, retrain, or meaningfully audit what they have been given.

Small language models are different. At the scale where a model can run on a phone, a laptop, or a modest server, the full apparatus of open source becomes possible again: reproducible training runs, portable weights, documented data, community fine-tuning, independent evaluation. What is aspirational at the frontier is achievable here.

The comparison to mobile computing is useful. Smartphones changed who got to use computers not by being more powerful than desktops but by reaching people who would never have used one. AI is following the same pattern. Cloud-hosted frontier systems serve the populations already served by cloud infrastructure. Models small enough to run locally reach everyone else.

Openness on its own is not the point. The point is what openness enables: the capacity of the people a system affects to inspect it, contest it, correct it, and refuse it. National or vendor control of AI infrastructure is hollow when the system stays irreversible for those it excludes, misclassifies, or fails. A system is genuinely open not because someone owns its software but because the people it governs can do something about it when it goes wrong. We wrote this accord because small models are where that capacity can actually be built, at the scale where it affects the most lives.

## 2. Openness comes in layers, and endorsement is a direction of travel

An AI system is open to the extent that someone other than its original developer can reproduce it, inspect it, and change it. The Open Source Initiative has defined this carefully for AI in its Open Source AI Definition, requiring access to code, parameters, and information about training data. We draw on that work and extend it by adding a fourth layer.

We call the four layers **Logic, Weights, Data, and Representation**, together **LWD-R**. Logic is the model architecture and the inference code. Weights are the trained parameters, released under terms that allow use, redistribution, and modification. Data is the training corpus, including any routing or gating data for architectures that use them, documented well enough that someone else could reproduce or substitute it. Representation is the set of categories the model uses to interpret the world, documented so that the communities the model classifies can review and contest them.

Without representation, openness stops at mechanics and never reaches meaning. A system can expose its code and weights while embedding classifications that cannot be examined or contested. Representation makes those assumptions visible.

Not every release satisfies every layer, and the accord does not pretend otherwise. A base model release is assessed for the full training it represents. A derivative (a fine-tune, an adapter, a distillation, a domain or task adaptation) is assessed only for what that derivative adds, with the base model's own disclosure referenced rather than reproduced. Each stage discloses its own work. The openness of the whole system is the composition of what each stage contributes.

Endorsement commits signatories to progress on the layers they touch, to document clearly which layers their releases meet, and to treat full openness across the stack as the long-term goal. Few releases in 2026 meet all four layers fully. The accord asks signatories to make visible where they are, and to move.

## 3. Domain, task, and language: the deployment unit

Small models work well not because they are miniature versions of large ones but because they serve a different purpose. A useful small model is usually scoped to a specific domain, tuned for a specific task, and built for a specific language or language mix. Agricultural question-answering in Kannada. Legal summarization for Indian tax law. Clinical discharge notes in Bangla. Maintenance log extraction in a particular industrial vocabulary. Each of these is a bounded problem, and small models are the natural architecture for bounded problems.

This inverts the frontier thesis. A frontier model tries to serve every domain, every task, and every language at once, which forces compromises on all three. A small model that serves one domain, one task, and one language mix can actually be good at that specific thing. It can also be owned and maintained by the institution that deploys it, because the institution can fine-tune it on its own data without sending that data to a vendor.

Three consequences follow. Deployment goes to the SLM layer, not the frontier, because the organizations doing the deployment need models that understand their specific work. Openness at the SLM layer is a precondition for this, because an institution cannot fine-tune a frontier model on proprietary data without surrendering it to the vendor. And language coverage stops being about training ever-larger models on ever-more-languages and starts being about enabling the communities that need a model in their language to build one.

We commit to supporting this deployment pattern (domain, task, language) as a first-class way to build AI, and to designing the models, tools, benchmarks, and documentation that make it practical.

## 4. Running a model is not the same as reproducing it

Inference is not reproduction. A model that runs on modest hardware is not automatically accessible in any meaningful sense. Mixture-of-experts architectures and other efficiency designs can make a model cheap to run while keeping it expensive to retrain. Two capacities are different here and need to be distinguished. Inference forkability is the ability to take a released model and run it. Training forkability is the ability to reproduce or fundamentally alter it. Only the second produces accountability; the first produces convenience.

Where reproducing a model requires compute well beyond what research institutions, public bodies, enterprises, or independent developers can assemble, openness in principle becomes narrowness in practice. This is what we call compute capture: when training cost so far exceeds accessible compute that legal forkability becomes meaningless without practical reproducibility. Compute access is not an ancillary concern for the open AI community. It is part of what openness means.

We support the development of public, academic, federated, and community-governed compute resources. We commit to publishing honest training cost estimates, inference cost estimates, and data manifests, so that anyone can assess whether a given model is actually reproducible. Active parameter counts, compute used, and other proxies are not substitutes for disclosed cost.

## 5. Local inference is how accountability stays with the people affected

The capacity to inspect, contest, correct, and refuse an AI system only remains available when the inference happens somewhere the affected people can reach. Centralized inference concentrates that capacity in whoever operates the servers. Local inference (on the user's device, on community or cooperative infrastructure, on institutional clusters) distributes it to where it is actually exercised.

The benefits of running locally are not only about speed or privacy, though those matter. A model running on a clinic's own server cannot be remotely disabled, silently updated, or metered by token. A model running on a farmer's phone does not require her data to leave her hand. A model running on a community server in a region with intermittent connectivity continues to work when the connection fails. These are properties the cloud cannot deliver no matter how cheap its API becomes.

We commit to prioritizing deployment topologies that keep inference local without losing essential function, and to building the models, runtimes, and tooling that make local-first deployment a mature option across the hardware that actually exists in the world.

## 6. Safety comes from inspectable architecture, not from closing the system

Concerns about AI safety are legitimate, and some of them are urgent. The question is what architectural response those concerns should produce. We believe that response is inspectable, reproducible systems with deterministic boundaries around what the model can do, not restricted access to weights, training data, or operational logic.

Closing a system in the name of safety does not remove the safety problem. It relocates accountability from the system's architecture to the vendor's judgment, and it puts the power to decide what is safe in the hands of the same actors whose commercial interests are served by holding that power. The opposite approach produces more accountability, not less: systems whose behavior can be independently verified, whose failure modes can be studied in public, and whose corrections do not depend on the operator's consent.

Safety in this sense is measurable. The dimensions, borrowed from the aviation, nuclear, and automotive engineering traditions that have handled safety-critical systems for decades, are consistency under repetition, robustness under perturbation, predictability in how a system fails, and severity bounds on what happens when it does. These measures are independent of raw capability. A more capable system is not automatically a safer one. A scoped system is easier to evaluate than an unbounded one.

## 7. Agents need boundaries that do not depend on the model's cooperation

As models are wired into agent systems that take actions in real environments, probabilistic reasoning has to be paired with deterministic limits. The model proposes an action; a deterministic policy layer outside the model (inspectable, machine-readable, and outside the prompt context) decides whether that action is allowed. We refer to this separation between probabilistic inference and deterministic execution as the action boundary. This is how prompt injection gets stopped, how runaway agents get contained, and how the actions an agent can take remain something a human could have anticipated.

We support open standards for composing agents and for specifying the skills and tools they are allowed to use. We commit to developing, publishing, and reviewing skill specifications, tool definitions, and action boundaries as first-class open artifacts, alongside the models they constrain. Agent evaluation needs multi-run protocols, systematic perturbation testing, and the release of transcripts detailed enough for independent reviewers to check whether the agent actually behaved as its designers claimed.

## 8. Evaluation should measure what matters for deployment

A system is reproducible in the open source sense when an independent party, given what has been published, can rebuild it and verify that it behaves as claimed. For AI this requires reproducible training procedures where feasible, clear records of compute and data provenance, and evaluation protocols that measure what actually matters once the system is deployed.

Benchmarks that reduce a system to a single accuracy score hide the differences that determine whether the system is fit for use. A model that succeeds seventy percent of the time does not reliably succeed. A model that is cheaper to run than a competitor may be more expensive to retrain. Useful evaluation reports capability alongside reliability, and accuracy alongside cost, not through proxies like parameter counts, but in terms someone else can reproduce. Pareto-frontier reporting, multi-run protocols, transcript release, and honest cost disclosure are what separate evaluation from marketing. For capabilities that resist benchmarking (long-horizon tasks, open-ended agent work, tasks whose success is qualitative), open-world evaluations with documented human intervention and qualitative log analysis complement benchmarks rather than replacing them.

We commit to publishing our work in forms that support independent verification at the scope of each contribution, including transcripts, multi-run statistics, and cost disclosures in terms that can be reproduced. We commit to engaging with standards and regulatory processes as they mature.

## 9. Where the work happens

Open infrastructure benefits from coordination through standards bodies: the Open Source Initiative, IETF, W3C, and specific communities within broader foundations where substantive work gets done. We support contributing to these venues when participation is open and the work serves the principles here.

No venue is inherently legitimate. Legitimacy comes from whether the venue can be inspected, challenged, and improved. Participating in a venue is a practical choice about where work happens, not an endorsement of its governance. Where established venues cannot be corrected through participation, federation, alternative venue formation, and evolution of the governance itself are legitimate responses.

## 10. The window that is open now

The protocols, runtimes, model architectures, and release practices that get normalized in the next few years will shape what is possible for a decade after that. Agent orchestration standards are being consolidated. On-device AI runtimes are being wired into mobile and desktop operating systems. National AI frameworks are being drafted. Releases that meet only some of the layers the accord names are being treated as "open" in policy documents.

These choices are still being made. They will not be in five years. The accord exists because the present moment still rewards coordinated direction.

## 11. Accountability and change

Endorsing this accord is a statement of direction, not a claim of arrival. Signatories will fall short of these principles in specific releases and specific decisions. What they commit to is making those shortfalls visible (through public LWD-R disclosures) and working toward closing them over time.

A public registry, maintained alongside this accord, records each signatory's current LWD-R disclosure: which layers their releases meet, which gaps they have committed to closing, and what progress has been made. This makes the direction of travel something that can be checked rather than asserted.

The accord is versioned. It can be revised through open process as the technical, governance, and regulatory ground shifts. Signatories can withdraw. The community can contest endorsements that become symbolic without corresponding practice.

---

The Open Small Models Accord, version 0.1 (draft), issued 6 April 2026, authored by [Anivar Aravind](https://anivar.net). Hosted at [openslm.ai](https://openslm.ai/). Released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Translate, adapt, republish. Endorse by signing. Build according to the principles.
