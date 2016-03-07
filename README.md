# placeB Website

In action: [placeb.ch](https://www.placeb.ch)

install

```
bundle install
```

run 

```
jekyll serve
```
    
build

```
JEKYLL_ENV=production jekyll build
```

Google Tag Manager

http://www.simoahava.com/analytics/create-a-generic-event-tag/


```
dataLayer.push({
  'event' : 'GAEvent',
  'eventCategory' : 'Chat',
  'eventAction' : 'click',
  'eventLabel' : 'footer',
  'eventValue' : undefined
});
```



Deploy status:

[ ![Codeship Status for placeB/placeb.ch](https://codeship.com/projects/431501a0-c0fa-0133-c10c-729121957dab/status?branch=master)](https://codeship.com/projects/137347)