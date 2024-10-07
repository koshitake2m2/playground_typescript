type Subscriber<T> = (message: T) => Promise<void> | void;

class Publisher<T> {
  private subscribers: Map<string, Subscriber<T>> = new Map();

  setSubscriber(key: string, subscriber: Subscriber<T>) {
    this.subscribers.set(key, subscriber);
  }

  unsubscribe(key: string) {
    this.subscribers.delete(key);
  }

  unsubscribeAll() {
    this.subscribers.clear();
  }

  // You don't need to use await if you don't need to wait for the subscribers to finish processing the message.
  async publish(message: T): Promise<void[]> {
    return await Promise.all(
      Array.from(this.subscribers).map(([_key, subscriber]) =>
        subscriber(message)
      )
    );
  }
}

const publisher = new Publisher<string>();

const subscriber1: Subscriber<string> = (message) => {
  console.log(`Subscriber 1: ${message}`);
};
const subscriber2: Subscriber<string> = async (message) => {
  await new Promise((r) => setTimeout(r, 1000));
  console.log(`Subscriber 2: ${message}`);
};

publisher.setSubscriber("subscriber1", subscriber1);
publisher.setSubscriber("subscriber2", subscriber2);

publisher.publish("hello world!").then(() => {
  console.log("All subscribers have received the message");
});

publisher.unsubscribeAll();
