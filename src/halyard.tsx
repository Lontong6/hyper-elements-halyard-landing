import {
  Button,
  Column,
  component,
  defineTheme,
  Divider,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  Menu,
  Page,
  Polygon,
  prop,
  Rect,
  Row,
  Section,

  Span,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";

/**
 * Halyard — a landing page for a deployment platform for small teams.
 *
 * One `defineTheme` carries the brand (colors, type scale, button variants,
 * named card/chip styles). Two typed custom components — `halyard.LogLine`
 * and `halyard.Feature` — are defined with `component()` and checked by
 * `validate()` exactly like the built-ins.
 */

const halyard = defineTheme({
  colors: {
    background: "#f7f8fa",
    foreground: "#101b33",
    primary: "#2545d3",
    primaryForeground: "#ffffff",
    muted: "#5a6b84",
    border: "#dfe4ec",
  },
  fonts: {
    body: "Inter, -apple-system, 'Segoe UI', Arial, sans-serif",
    heading: "Inter, -apple-system, 'Segoe UI', Arial, sans-serif",
  },
  components: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 56, lineHeight: 1.04, letterSpacing: -1.5, fontWeight: 800, mobile: { fontSize: 37, letterSpacing: -1 } },
          2: { fontSize: 36, lineHeight: 1.12, letterSpacing: -0.8, fontWeight: 800, mobile: { fontSize: 28 } },
          3: { fontSize: 19, lineHeight: 1.3, fontWeight: 700 },
        },
      },
    },
    Button: {
      borderRadius: 10,
      padding: [13, 22],
      fontWeight: 600,
      hover: { backgroundColor: "#1b34a6" },
      variants: {
        secondary: {
          backgroundColor: "#ffffff",
          color: "#101b33",
          border: { width: 1, style: "solid", color: "#dfe4ec" },
          hover: { backgroundColor: "#eef1f6" },
        },
        inverted: {
          backgroundColor: "#ffffff",
          color: "#0c1428",
          hover: { backgroundColor: "#dce4f5" },
        },
      },
    },
  },
  styles: {
    card: {
      backgroundColor: "#ffffff",
      border: { width: 1, style: "solid", color: "#dfe4ec" },
      borderRadius: 16,
      padding: 28,
      gap: 12,
    },
    chip: {
      backgroundColor: "#e8edfb",
      color: "#2545d3",
      borderRadius: 999,
      padding: [5, 12],
      fontSize: 13,
      fontWeight: 600,
    },
  },
});

/** One line of the hero's deploy log, with a status chip. */
const LogLine = component({
  type: "halyard.LogLine",
  label: "Deploy log line",
  description: "A timestamped line of deploy output with a status chip.",
  props: {
    time: prop.text({ required: true }),
    message: prop.text({ required: true }),
    status: prop.choice(["done", "live"], { default: "done" }),
  },
  render: ({ time, message, status }) => (
    <Row stackOnMobile={false} style={{ gap: 12, alignItems: "center" }}>
      <Text style={{ color: "#7d8db0", fontSize: 13, width: 44 }}>{time}</Text>
      <Column
        style={{
          backgroundColor: status === "live" ? "#f2a007" : "#1d2c4d",
          borderRadius: 999,
          padding: [3, 10],
          flex: "none",
        }}
      >
        <Text style={{ color: status === "live" ? "#0c1428" : "#9fb4dd", fontSize: 11, fontWeight: 700 }}>
          {status === "live" ? "LIVE" : "DONE"}
        </Text>
      </Column>
      <Text style={{ color: "#d7deea", fontSize: 14 }}>{message}</Text>
    </Row>
  ),
});

/** A feature card with a geometric glyph drawn in Svg. */
const Feature = component({
  type: "halyard.Feature",
  label: "Feature",
  description: "A feature card: an Svg glyph, a title and a short explanation.",
  props: {
    glyph: prop.choice(["bolt", "shield", "bars", "stack", "branch", "globe"], { required: true }),
    title: prop.text({ required: true }),
    body: prop.text({ required: true }),
  },
  render: ({ glyph, title, body }) => (
    <Column style={{ apply: ["card"] }}>
      <Svg width={30} height={30} viewBox="0 0 24 24">
        {glyph === "bolt" && <Polygon points="13,1 4,14 10.5,14 9,23 20,9.5 13.5,9.5" style={{ fill: "#f2a007" }} />}
        {glyph === "shield" && (
          <Polygon points="12,2 20,4.8 20,11 12,22 4,11 4,4.8" style={{ fill: token("colors.primary") }} />
        )}
        {glyph === "bars" && (
          <>
            <Rect x={3} y={13} width={5} height={8} style={{ fill: token("colors.primary"), opacity: 0.45 }} />
            <Rect x={9.5} y={9} width={5} height={12} style={{ fill: token("colors.primary"), opacity: 0.7 }} />
            <Rect x={16} y={4} width={5} height={17} style={{ fill: token("colors.primary") }} />
          </>
        )}
        {glyph === "stack" && (
          <>
            <Rect x={4} y={4} width={16} height={4.5} rx={1.5} style={{ fill: token("colors.primary") }} />
            <Rect x={4} y={10} width={16} height={4.5} rx={1.5} style={{ fill: token("colors.primary"), opacity: 0.65 }} />
            <Rect x={4} y={16} width={16} height={4.5} rx={1.5} style={{ fill: token("colors.primary"), opacity: 0.35 }} />
          </>
        )}
        {glyph === "branch" && (
          <>
            <Rect x={5} y={5} width={4} height={4} rx={2} style={{ fill: token("colors.primary") }} />
            <Rect x={15} y={15} width={4} height={4} rx={2} style={{ fill: "#f2a007" }} />
            <Rect x={5} y={15} width={4} height={4} rx={2} style={{ fill: token("colors.primary") }} />
            <Rect x={6.4} y={9} width={1.6} height={6} style={{ fill: token("colors.primary") }} />
            <Rect x={6.4} y={15.6} width={10} height={1.6} style={{ fill: token("colors.primary") }} />
          </>
        )}
        {glyph === "globe" && (
          <>
            <Rect x={3} y={3} width={18} height={18} rx={9} style={{ fill: token("colors.primary") }} />
            <Rect x={3} y={10.8} width={18} height={2.2} style={{ fill: "#ffffff", opacity: 0.55 }} />
            <Rect x={10.8} y={3} width={2.2} height={18} style={{ fill: "#ffffff", opacity: 0.55 }} />
          </>
        )}
      </Svg>
      <Heading level={3}>{title}</Heading>
      <Text style={{ color: token("colors.muted") }}>{body}</Text>
    </Column>
  ),
});

const plans = [
  {
    name: "Starter",
    price: "$0",
    blurb: "For side projects and first deploys.",
    features: ["3 projects", "100 builds a month", "Preview URLs on every push", "Community support"],
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Team",
    price: "$12",
    blurb: "For teams that ship every day.",
    features: [
      "Unlimited projects",
      "Unlimited builds, 3 concurrent",
      "Instant rollbacks, kept for 90 days",
      "Password-protected previews",
      "Slack deploy notifications",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Scale",
    price: "$29",
    blurb: "For products with an audience to keep.",
    features: [
      "Everything in Team",
      "12 concurrent builds",
      "Deploy metrics and audit log",
      "SSO and custom domains per branch",
      "Priority support, 1-hour response",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function HalyardLanding() {
  return (
    <Page
      lang="en"
      theme={halyard}
      width={1140}
      title="Halyard — Ship it the moment it's ready"
      description="Halyard is the deployment platform for small teams: push to Git and get a preview URL for every change, and production when you merge."
    >
      {/* Header */}
      <Section style={{ padding: [18, 0], mobile: { padding: "18px 20px" } }}>
        <Row style={{ alignItems: "center", gap: 24 }}>
          <Row stackOnMobile={false} style={{ gap: 10, alignItems: "center", flex: "none" }}>
            <Svg width={26} height={26} viewBox="0 0 24 24">
              <Polygon points="12,2 20,20 12,16.5" style={{ fill: token("colors.primary") }} />
              <Polygon points="12,2 4,20 12,16.5" style={{ fill: "#f2a007" }} />
            </Svg>
            <Text style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>Halyard</Text>
          </Row>
          <Menu
            items={[
              { text: "Product", href: "#features" },
              { text: "How it works", href: "#how" },
              { text: "Pricing", href: "#pricing" },
              { text: "FAQ", href: "#faq" },
            ]}
            style={{ color: token("colors.muted"), fontWeight: 600, fontSize: 15 }}
          />
          <Button href="#pricing" style={{ padding: [9, 16], flex: "none" }}>
            Start deploying
          </Button>
        </Row>
      </Section>

      {/* Hero */}
      <Section style={{ padding: [64, 0, 56], mobile: { padding: "44px 20px 40px" } }}>
        <Row style={{ gap: 48, alignItems: "center" }}>
          <Column style={{ gap: 22 }}>
            <Column style={{ apply: ["chip"], width: 202 }}>
              <Text>Now with deploy metrics</Text>
            </Column>
            <Heading level={1}>Ship it the moment it&rsquo;s ready.</Heading>
            <Text style={{ fontSize: 19, color: token("colors.muted") }}>
              Halyard turns every push into a preview your team can open, and every merge into a production deploy —
              with the rollback one click behind it. No pipelines to babysit, no YAML to debug.
            </Text>
            <Row style={{ gap: 12 }}>
              <Button href="#pricing">Deploy your first app</Button>
              <Button href="#how" variant="secondary">
                See how it works
              </Button>
            </Row>
            <Text style={{ fontSize: 14, color: token("colors.muted") }}>
              Free for teams up to five · No credit card · Deploys in about a minute
            </Text>
          </Column>

          {/* The deploy log: the product, shown rather than described */}
          <Column
            style={{
              backgroundColor: "#0c1428",
              borderRadius: 16,
              padding: 24,
              gap: 12,
              flex: 0.92,
            }}
          >
            <Row stackOnMobile={false} style={{ gap: 7, alignItems: "center" }}>
              <Column style={{ backgroundColor: "#ff5f57", width: 11, height: 11, borderRadius: 999 }} />
              <Column style={{ backgroundColor: "#febc2e", width: 11, height: 11, borderRadius: 999 }} />
              <Column style={{ backgroundColor: "#28c840", width: 11, height: 11, borderRadius: 999 }} />
              <Text style={{ color: "#7d8db0", fontSize: 13 }}>deploy #4821 — acme/storefront</Text>
            </Row>
            <Divider style={{ borderTop: { width: 1, style: "solid", color: "#1d2c4d" } }} />
            <LogLine time="00:00" message="Cloned acme/storefront @ 9f3c2e1" />
            <LogLine time="00:04" message="Installed 214 packages — cache hit 96%" />
            <LogLine time="00:11" message="Built 128 pages in 6.8 seconds" />
            <LogLine time="00:12" message="Checks passed: types, links, images" />
            <LogLine time="00:13" message="Live at storefront.halyard.app" status="live" />
            <Text style={{ color: "#7d8db0", fontSize: 13 }}>
              Rollback point saved · deploy #4820 kept for 90 days
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Logo strip */}
      <Section style={{ padding: [10, 0, 44], mobile: { padding: "10px 20px 36px" } }}>
        <Column style={{ gap: 18, alignItems: "center" }}>
          <Text style={{ color: token("colors.muted"), fontSize: 14, fontWeight: 600 }}>
            Powering deploys at 4,000+ teams
          </Text>
          <Row style={{ gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {["ALDERLINE", "MOTT", "FERRUS", "JUNO LABS", "KITE & CO", "ALBA"].map((name) => (
              <Text key={name} style={{ fontSize: 16, fontWeight: 700, color: "#5a6b84", letterSpacing: 1.2 }}>
                {name}
              </Text>
            ))}
          </Row>
        </Column>
      </Section>

      {/* Features */}
      <Section style={{ backgroundColor: "#ffffff", padding: [72, 0], mobile: { padding: "52px 20px" } }}>
        <Column style={{ gap: 36 }}>
          <Column style={{ gap: 14, maxWidth: 640 }}>
            <Heading level={2}>Everything between push and live, handled</Heading>
            <Text style={{ fontSize: 17, color: token("colors.muted") }}>
              Halyard watches your repository and does the unglamorous work of deployment — building, checking,
              publishing and keeping the last good version warm — so a release stops being an event.
            </Text>
          </Column>
          <Grid columns={3} style={{ gap: 20 }}>
            <Feature
              glyph="bolt"
              title="Builds that start instantly"
              body="Builds begin the second you push and run on machines sized to your project. The median Halyard deploy is live in 47 seconds."
            />
            <Feature
              glyph="globe"
              title="A preview for every push"
              body="Every branch and pull request gets its own URL, identical to production, ready to send to anyone for review."
            />
            <Feature
              glyph="shield"
              title="Rollbacks without drama"
              body="Every deploy is kept, immutable, for 90 days. Rolling back is switching traffic, not rebuilding history."
            />
            <Feature
              glyph="branch"
              title="Git-native, nothing new to learn"
              body="No config files to adopt and no dashboard rituals. Merge to deploy, open a pull request to preview. That is the whole workflow."
            />
            <Feature
              glyph="bars"
              title="Metrics on every deploy"
              body="Build time, cache health and traffic per deploy, on the deploy itself — so a slow release is a fact, not a feeling."
            />
            <Feature
              glyph="stack"
              title="Monorepos welcome"
              body="Halyard detects the apps in a repository and builds only what changed, each with its own previews and rollbacks."
            />
          </Grid>
        </Column>
      </Section>

      {/* How it works */}
      <Section style={{ padding: [72, 0], mobile: { padding: "52px 20px" } }}>
        <Column style={{ gap: 36 }}>
          <Heading level={2}>From push to live in three steps</Heading>
          <Row style={{ gap: 28 }}>
            {[
              {
                n: "1",
                t: "Connect your repository",
                b: "Sign in with GitHub or GitLab and pick a repository. Halyard detects the framework and the build settings — most projects need no configuration at all.",
              },
              {
                n: "2",
                t: "Push, and get a preview",
                b: "Every push builds in the cloud and returns a preview URL that behaves exactly like production, down to redirects, headers and environment variables.",
              },
              {
                n: "3",
                t: "Merge to go live",
                b: "Merging promotes the very build you reviewed — never a rebuild — to your domain, with the previous deploy kept as an instant rollback.",
              },
            ].map((step) => (
              <Column key={step.n} style={{ gap: 10 }}>
                <Text style={{ fontSize: 42, fontWeight: 800, color: token("colors.primary") }}>{step.n}</Text>
                <Heading level={3}>{step.t}</Heading>
                <Text style={{ color: token("colors.muted") }}>{step.b}</Text>
              </Column>
            ))}
          </Row>
        </Column>
      </Section>

      {/* Pricing */}
      <Section style={{ backgroundColor: "#ffffff", padding: [72, 0], mobile: { padding: "52px 20px" } }}>
        <Column style={{ gap: 36 }}>
          <Column style={{ gap: 14, maxWidth: 640 }}>
            <Heading level={2}>Pricing that scales with the team, not the traffic</Heading>
            <Text style={{ fontSize: 17, color: token("colors.muted") }}>
              Every plan includes unlimited bandwidth and previews. You pay for the people who ship, never for the
              people who visit.
            </Text>
          </Column>
          <Row style={{ gap: 20, alignItems: "stretch" }}>
            {plans.map((plan) =>
              plan.featured ? (
                <Column
                  key={plan.name}
                  style={{ backgroundColor: "#0c1428", borderRadius: 16, padding: 28, gap: 14 }}
                  tokens={{ colors: { foreground: "#ffffff", muted: "#9fb4dd" } }}
                >
                  <Row stackOnMobile={false} style={{ alignItems: "center", gap: 10 }}>
                    <Text style={{ fontWeight: 700, fontSize: 17 }}>{plan.name}</Text>
                    <Column style={{ backgroundColor: "#f2a007", borderRadius: 999, padding: [4, 11], flex: "none" }}>
                      <Text style={{ color: "#0c1428", fontSize: 12, fontWeight: 700 }}>Most popular</Text>
                    </Column>
                  </Row>
                  <Row stackOnMobile={false} style={{ gap: 8, alignItems: "end" }}>
                    <Text style={{ fontSize: 42, fontWeight: 800, flex: "none" }}>{plan.price}</Text>
                    <Text style={{ color: token("colors.muted"), flex: "none" }}>per developer / month</Text>
                  </Row>
                  <Text style={{ color: token("colors.muted") }}>{plan.blurb}</Text>
                  <List style={{ color: "#d7deea", gap: 8 }}>
                    {plan.features.map((f) => (
                      <ListItem key={f}>{f}</ListItem>
                    ))}
                  </List>
                  <Button href="#faq" variant="inverted">
                    {plan.cta}
                  </Button>
                </Column>
              ) : (
                <Column key={plan.name} style={{ apply: ["card"], gap: 14 }}>
                  <Text style={{ fontWeight: 700, fontSize: 17 }}>{plan.name}</Text>
                  <Row stackOnMobile={false} style={{ gap: 8, alignItems: "end" }}>
                    <Text style={{ fontSize: 42, fontWeight: 800, flex: "none" }}>{plan.price}</Text>
                    <Text style={{ color: token("colors.muted"), flex: "none" }}>per developer / month</Text>
                  </Row>
                  <Text style={{ color: token("colors.muted") }}>{plan.blurb}</Text>
                  <List style={{ gap: 8 }}>
                    {plan.features.map((f) => (
                      <ListItem key={f}>{f}</ListItem>
                    ))}
                  </List>
                  <Button href="#faq" variant="secondary">
                    {plan.cta}
                  </Button>
                </Column>
              ),
            )}
          </Row>
        </Column>
      </Section>

      {/* Testimonial */}
      <Section style={{ padding: [72, 0], alignItems: "center", mobile: { padding: "52px 20px" } }}>
        <Column style={{ gap: 18, alignItems: "center", maxWidth: 780 }}>
          <Text
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontStyle: "italic",
              fontSize: 28,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            “We deleted our release checklist. It is just merge, now — and the one time we needed the old version back,
            it took eleven seconds.”
          </Text>
          <Text style={{ color: token("colors.muted") }}>
            <Span style={{ fontWeight: 700, color: token("colors.foreground") }}>Priya Nair</Span> — Engineering lead,
            Alderline
          </Text>
        </Column>
      </Section>

      {/* FAQ */}
      <Section style={{ backgroundColor: "#ffffff", padding: [72, 0], mobile: { padding: "52px 20px" } }}>
        <Column style={{ gap: 36 }}>
          <Heading level={2}>Questions, answered</Heading>
          <Grid columns={2} style={{ gap: 32 }}>
            {[
              {
                q: "Which frameworks does Halyard support?",
                a: "Next.js, Astro, SvelteKit, Nuxt, Remix and plain static sites render out of the box, and anything with a build command can be configured in one line. Server functions run in the same regions as your static assets.",
              },
              {
                q: "What happens if a deploy breaks production?",
                a: "Open the deploy, choose the last good one, and switch traffic. The rollback is a pointer change, not a rebuild, so it completes in seconds — and the broken deploy stays available for debugging.",
              },
              {
                q: "Can I use my own domain?",
                a: "Yes, on every plan including the free one. Halyard provisions and renews certificates automatically, and branch domains follow a pattern you choose, such as staging.example.com.",
              },
              {
                q: "How is Halyard priced as we grow?",
                a: "Per developer, per month — the people with push access. Viewers, reviewers on preview URLs and your site's visitors are never counted, and bandwidth is unmetered on all plans.",
              },
            ].map((item) => (
              <Column key={item.q} style={{ gap: 8 }}>
                <Heading level={3}>{item.q}</Heading>
                <Text style={{ color: token("colors.muted") }}>{item.a}</Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </Section>

      {/* Final CTA */}
      <Section style={{ backgroundColor: "#0c1428", padding: [72, 0], mobile: { padding: "52px 20px" } }} tokens={{ colors: { foreground: "#ffffff" } }}>
        <Column style={{ gap: 18, alignItems: "center" }}>
          <Heading level={2} style={{ textAlign: "center" }}>
            Hoist your next release.
          </Heading>
          <Text style={{ color: "#9fb4dd", fontSize: 17, textAlign: "center", maxWidth: 560 }}>
            Connect a repository and watch your first deploy go live in about a minute. Free while your team is small.
          </Text>
          <Button href="#pricing" variant="inverted">
            Start deploying free
          </Button>
        </Column>
      </Section>

      {/* Footer */}
      <Section style={{ padding: [44, 0], mobile: { padding: "36px 20px" } }}>
        <Column style={{ gap: 28 }}>
          <Row style={{ gap: 40 }}>
            <Column style={{ gap: 12, flex: 1.4 }}>
              <Row stackOnMobile={false} style={{ gap: 10, alignItems: "center" }}>
                <Svg width={22} height={22} viewBox="0 0 24 24">
                  <Polygon points="12,2 20,20 12,16.5" style={{ fill: token("colors.primary") }} />
                  <Polygon points="12,2 4,20 12,16.5" style={{ fill: "#f2a007" }} />
                </Svg>
                <Text style={{ fontSize: 18, fontWeight: 800 }}>Halyard</Text>
              </Row>
              <Text style={{ color: token("colors.muted"), maxWidth: 300 }}>
                The deployment platform for small teams. Push to preview, merge to production, roll back in seconds.
              </Text>
              <Row style={{ gap: 18 }}>
                {[
                  { text: "GitHub", href: "https://github.com" },
                  { text: "X", href: "https://x.com" },
                  { text: "LinkedIn", href: "https://linkedin.com" },
                ].map((s) => (
                  <Text key={s.text} style={{ fontSize: 14, fontWeight: 600, flex: "none" }}>
                    <Link href={s.href} style={{ color: token("colors.muted") }}>
                      {s.text}
                    </Link>
                  </Text>
                ))}
              </Row>
            </Column>
            {[
              { h: "Product", items: ["Previews", "Rollbacks", "Metrics", "Changelog"] },
              { h: "Company", items: ["About", "Blog", "Careers", "Press kit"] },
              { h: "Resources", items: ["Documentation", "API reference", "Status", "Support"] },
            ].map((col) => (
              <Column key={col.h} style={{ gap: 12 }}>
                <Text style={{ fontWeight: 700 }}>{col.h}</Text>
                <Column style={{ gap: 9 }}>
                  {col.items.map((i) => (
                    <Text key={i} style={{ fontSize: 15 }}>
                      <Link
                        href={`https://halyard.app/${i.toLowerCase().replaceAll(" ", "-")}`}
                        style={{ color: token("colors.muted") }}
                      >
                        {i}
                      </Link>
                    </Text>
                  ))}
                </Column>
              </Column>
            ))}
          </Row>
          <Divider />
          <Row style={{ gap: 28, alignItems: "center" }}>
            <Text style={{ fontSize: 13, color: token("colors.muted"), flex: "none" }}>
              © 2026 Halyard Systems, Inc.
            </Text>
            {["Privacy", "Terms", "Security"].map((i) => (
              <Text key={i} style={{ fontSize: 13, flex: "none" }}>
                <Link href={`https://halyard.app/${i.toLowerCase()}`} style={{ color: token("colors.muted") }}>
                  {i}
                </Link>
              </Text>
            ))}
          </Row>
        </Column>
      </Section>
    </Page>
  );
}
