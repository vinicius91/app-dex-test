# New Relic Appdex Display

This is an app to solve a code challenge sent from New Relic

## Installation and Usage

There are two ways to run the project locally, using Docker or using node.

### Docker

Using this method you will simulate the same environment that is used in production, including the building process of Bitbucket's Pipeline

```bash
make start-docker
```

### Node

This is the method used for local development, including the source maps of the code.

```bash
make start-node
```

--------------

## **The Challenge*

### What we need to solve?

We want to build a new page view that shows the list of applications running on every host.

### What is expected from the app?

We can divide it in the two sections bellow.

#### OO Code

- Model the described problem with a suitable class hierarchy;
- Include a method ("getTopAppByHost") that, given a hostname, retrieves a list of the 25 most satisfying applications;
- Implement the "addAppToHosts" and "removeAppFromHosts" methods, which update the list of applications with higher Apdex whenever any of these methods is called;

#### UI

- Each card representing a host most display its top 5 apps ordered by satisfaction;
- Create two types of layouts, grid and list, according to its mockups, and add the option to exchange between layouts using a checkbox;
- When clicking over an app, an alert dialog including the release number has to be shown.
- Browser support: IE11+, latest two versions of Chrome, Firefox, Safari and Opera.

### Requirements & Restrictions

- Each application list is always ordered by Apdex. The first app is the one with the highest Apdex. From top to bottom, most satisfied to most frustrated app.
- For this specific solution, you not need to worry about changes on the Apdex metric of an application.

### Things that they are looking for

- Maintainable and well-written code using good object oriented practices.
- Specify Big-O notation of your algorithm. You should strive for an optimal solution.

### Things that they are NOT looking for

- Database or any data source connection or any kind of ORM. It’s OK to read the provided JSON file all at once.
- Using 3rd party libraries such as JS or CSS libraries (i.e Angular, React...). Except for the ones to assist your development such as test or build frameworks.

-------------

## **The Solution**

You can find the app running instance at this [link](http://newrelic-appdex.us-east-1.elasticbeanstalk.com/)

### Dev environment and building tools

For this challenge I've decided to go with Webpack and Babel for the building and transpiling of the code. I've also used the Webpack local server to help in the development with it's HotReload feature.

For the linting and static analysis I decided to go with the Eslint and use Airbnb presets as rules, only defining the globals that are used to access some of the DOM API's directly from the adapters. I've also chose Prettier to facilitate the formating of the code using those rules during the development process.

### Testing

I chose Cypress to handle all of my tests, I think of it as an amazing tool that really helps with the testing process. It fell like the best choice given that I would be able to run integration and unit tests with the same tool without changing the way that the tests are written.

I chose to divide the tests in two parts, Integration and Unit. In the Unit tests part I've focused on guaranteeing the algorithm execution and the three methods that were described at the challenge description. At the Integration part of the test, my objective was to guarantee that the information was rendered as expected.

### Styles

I chose to go with simple and basic CSS. My line of thought was that if I'm using vanilla JavaScript I should take the same approach with CSS.

I took the liberty of adding some styles that were not included in the model for usability reasons. I added some shadow to the cards in order to generate a better contrast from the background. I also added some hover effects for the app's list inside the card and changed it's cursor to indicate that they are clickable.

I also added a loading to the initial render. I added this feature because fo my choice regarding data fetch, which I'll explain in the next topics.

### Data Fetch and Storage

At the challenge description, the way of accessing the data is one of the things that they are not looking for and it is stated that I could read the hole JSON file at once, so that's the approach that I took.

With that approach in mind, I've could bundle the JSON that I've received with Webpack and load it directly from the code, but by doing so the bundle size would increase dramatically. The solution that I chose was to upload the data into a S3 Bucket so I could load it with the XMLHttpRequest. With that approach I've reduced the bundle size and improved the user experience by adding a second step in the rendering process of the app, indicating that the data was being loaded.


### Domain

For the OO part of the application, I structured the code into the domain folder where I created the main models, AppModel,HostModel, and HostsModel. I've separated the algorithm part into a folder called tree in order to improve organization and reduce cognitive load while reading trough the code.

### Algorithm

In order to read the and classify the large amount of that was provided in a efficient way, I decided to go with a tree data structure. The one that I choose was the binary search tree. With this approach I used the variation of the in order traversal, instead of searching for the left node first, I went for the right node and got the Apps with the higher Apdex first.

The construction of the Apps data is a O(n), just a simple for loop using the AppModel constructor.

The construction of the HostsModel, which aggregates the hosts derived from the apps, has a similar notation, given that the amount of hosts from a applications would not be higher than 10, number of hosts displayed on the the screen. We could consider it as a constant 10 enabling us to drop it and keep a O(n).

#### Binary Search Tree Time Complexity

|  Access   |  Search   | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

#### Binary Search Tree Space Complexity

O(n)


### UI Render - Components

In order to create the components and render them in the Dom, I decide to go with a approach similar to React regarding the class structure. I consider it a good and simple approach that is very readable in small and simple components. I created a adapter to facilitate the creation of components and storing the HTML nodes in it. With this It would be easier to access the nodes to manipulate them later. It's very very poor version of the React's Virtual Dom.

For the naming convention, I took an approach that is more similar to Angular, I like the way that they structure and separate their files, but I did not wanted to add the complexity of parsing HTML templates, so I kept the templating and rendering more similar to jsx.

### Browser Compatibility

To provide compatibility across browsers and to support the ones that were listed in the challenge, I used 2 polyfills,core-js/stable and regenerator-runtime. Those are the only *libs* included in the delivery bundle.
