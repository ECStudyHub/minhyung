export class EventManager {
  mapper = {};

  addEventListener(target, event_name, callback, options) {
    if (!this.mapper[event_name]) {
      this.mapper[event_name] = {};
    }
    //중복방지
    this.mapper[event_name][target] = { target, callback, options };
  }

  removeEventListener(target, event_name, callback) {
    if (this.mapper[event_name][target]) {
      if (this.mapper[event_name][target]?.callback === callback) {
        delete this.mapper[event_name][target];
      }
    }
  }

  triggerEvent(event_name, event) {
    const event_path = event.composedPath() ?? [];

    // 이벤트 캡쳐링
    for (let i = event_path.length - 1; i >= 0; i--) {
      const target = event_path[i];

      if (
        this.mapper[event_name]?.[target]?.target === target &&
        this.mapper[event_name]?.[target]?.options?.capture
      ) {
        this.mapper[event_name][target]?.callback.apply(target, event);
      }
    }

    // 이벤트 버블링
    for (let i = 0; i < event_path.length; i++) {
      const target = event_path[i];

      if (
        this.mapper[event_name]?.[target]?.target === target &&
        this.mapper[event_name]?.[target]?.options?.bubble !== false
      ) {
        this.mapper[event_name][target]?.callback.apply(target, event);
      }
    }
  }
}

export const event_manager = new EventManager();
