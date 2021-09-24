// Pollyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './style.css';
import icon from './assets/favicon.ico';
import RootComponent from './components/root.component';
import CardsContainerComponent from './components/cards/card-container.component';
import CardComponent from './components/cards/card/card.component';
import ApdexService from './services/apdex.service';
import HeaderComponent from './components/header/header.component';
import DomAdapter from './adapters/dom.adapter';
import LoadingComponent from './components/loading/loading.component';

function setFavIcon() {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = icon;
  document.getElementsByTagName('head')[0].appendChild(link);
}

function bootstrap() {
  setFavIcon();
  const domAdapter = new DomAdapter();
  // Create the base nodes
  const headerDom = new HeaderComponent(domAdapter, 'new-relic-apdex').render();
  const cardsContainerDom = new CardsContainerComponent(domAdapter, 'new-relic-apdex').render();
  const rootDom = new RootComponent(domAdapter, 'new-relic-apdex').render([
    headerDom,
    cardsContainerDom
  ]);
  // Append base nodes to the body
  document.body.appendChild(rootDom);
  const loading = new LoadingComponent(domAdapter, 'loading').render();

  cardsContainerDom.appendChild(loading);

  // Fetch data an append cards to container
  const service = new ApdexService();
  service.getHosts().then(hosts => {
    cardsContainerDom.removeChild(loading);
    const cards = hosts.map(host => new CardComponent(domAdapter, host.domain).render({ host }));
    cards.forEach(hostCard => {
      cardsContainerDom.appendChild(hostCard);
    });
  });
}

bootstrap();
