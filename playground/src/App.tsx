import { Button } from "@camply/ui";

export function App() {
	return (
		<main className="playground">
			<h1>Camply UI</h1>
			<p>Playground de développement local.</p>

			<section className="playground__section">
				<h2>Button</h2>
				<div className="playground__row">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
				</div>
				<div className="playground__row">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
				<div className="playground__row">
					<Button disabled>Disabled</Button>
				</div>
			</section>
		</main>
	);
}
