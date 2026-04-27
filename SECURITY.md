# Security policy

The openslm.ai website is a static document site. It does not handle user
accounts, payments, uploads, or any user-supplied data. The risk surface is
small but not zero.

## What counts as a security issue

- A vulnerability in the build, deploy, or hosting pipeline that would let an
  attacker alter the published site.
- A vulnerability in a dependency that affects the build or runtime of the
  site.
- A misconfiguration (DNS, GitHub Pages, repository permissions) that exposes
  the site to takeover.
- Anything that could be used to phish, mislead, or impersonate the project
  through the site itself.

## What is not a security issue

- Editorial disagreement with the accord text. Use issues or pull requests.
- Broken anchors, layout bugs, or styling issues. Use a regular issue.
- General opinions on AI safety, model openness, or open-source policy.

## How to report

Email <hello@openslm.ai> with "security" in the subject. Describe the issue,
how to reproduce it, and any suggested fix. We will acknowledge receipt
within seven days and aim to resolve or publicly disclose within thirty.

For low-severity issues, opening a private security advisory on GitHub is
also fine: <https://github.com/openslm-ai/website/security/advisories/new>.

## Scope

Only this repository (`openslm-ai/website`) and the deployed site at
<https://openslm.ai>. Issues in unrelated openslm-ai repositories should be
reported on those repositories.

## Disclosure

We coordinate disclosure where it makes sense: small fixes are deployed and
noted in the commit history; significant issues are written up after the fix
is live. We do not run a bug bounty.
