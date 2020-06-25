import React from 'react';

export interface SequenceChildProps {
  next: () => void,
  prev: () => void
}

export interface SequenceProps {
  children: ((props: SequenceChildProps) => JSX.Element)[]
}

interface SequenceState {
  index: number
}

export class Sequence extends React.Component<SequenceProps, SequenceState> {
  state = { index: 0 }

  next() {
    this.setState({index: Math.min(this.state.index + 1, this.props.children.length - 1)})
  }

  prev() {
    this.setState({index: Math.max(this.state.index - 1, 0)});
  }

  render() {
    let Child = this.props.children[this.state.index];
    return <div>
      <Child prev={this.prev.bind(this)} next={this.next.bind(this)} />
    </div>
  }
}
