# Content Validation Fixtures

Manual cases to verify before publishing:

- Missing `title`, `slug`, `date`, or `description` must fail validation.
- Duplicate `slug` values must fail validation.
- Invalid slug format must fail validation.
- Invalid dates must fail validation.
- Invalid posts must not appear in Home, Post routes, RSS, or sitemap.
