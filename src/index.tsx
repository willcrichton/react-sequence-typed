import React from 'react';

export interface SequenceChildProps {
  next: () => void,
  prev: () => void
}

export interface SequenceProps {
  children: (((props: SequenceChildProps) => JSX.Element) | null)[]
}

interface SequenceState {
  index: number
}

export class Sequence extends React.Component<SequenceProps, SequenceState> {
  state = { index: 0 }
  children_input: any[] = []

  constructor(props: SequenceProps) {
    super(props);
    this.children_input = props.children.filter((c) => c !== null);
  }

  next() {
    this.setState({index: Math.min(this.state.index + 1, this.children_input.length - 1)})
  }

  prev() {
    this.setState({index: Math.max(this.state.index - 1, 0)});
  }

  render() {
    let Child = this.children_input[this.state.index];
    return <div>
      <Child key={this.state.index} prev={this.prev.bind(this)} next={this.next.bind(this)} />
    </div>
  }
}

export class AccumulatingSequence extends Sequence {
  state = { index: 0 }
  children: JSX.Element[] = []

  constructor(props: SequenceProps) {
    super(props);
    this.make_child(0);
  }

  make_child(i: number) {
    if (i == this.children.length) {
      let Child = this.children_input[i];
      this.children.push(<Child key={i} prev={this.prev.bind(this)} next={this.next.bind(this)} />);
    }
  }

  next() {
    let index = Math.min(this.state.index + 1, this.children_input.length - 1);
    this.make_child(index);
    this.setState({index})
  }

  prev() {
    let index = Math.max(this.state.index - 1, 0);
    this.setState({index});
  }

  render() {
    let children = this.children.slice(0, this.state.index+1)
    return <>{children}</>;
  }
}
