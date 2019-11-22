import React from 'react';
import {
    Input,
    Menu,
    Segment,
    List,
    Image,
    Grid,
    Container,
    Card,
    Icon,
    Button,
  } from 'semantic-ui-react';
class Step1 extends React.Component {
  state = {
    imagePreviewUrl: null,
    activeItem: null,
    name: null,
  };

  fileChangedHandler = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  sendstateback = () => {
      const {imagePreviewUrl,activeItem,name} = this.state
    if(imagePreviewUrl && activeItem && name){
        this.props.onsubmit(this.state)
    }
  }
  render() {
    if (this.props.currentstep !== 1) { // Prop: The current step
        return null
      }
    const { imagePreviewUrl, activeItem, name } = this.state;
    return (
        <>
      <Container>
        <Grid>
          <Grid.Row style={{ marginTop: '50px' }}>
            <Grid.Column width={8}>
              <label
                className='ui button picturelabel'
                style={{
                  borderRadius: '20%',
                  height: '100%',
                  textAlign: 'center',
                  padding: imagePreviewUrl ? '20px' : '50px 50px',
                }}
              >
                <input
                  type='file'
                  name='avatar'
                  value={this.props.value}
                  onChange={this.fileChangedHandler}
                  style={{ backgroundColor: 'white' }}
                />
                {imagePreviewUrl ? (
                  <Image src={imagePreviewUrl} size='medium' rounded />
                ) : (
                  '+'
                )}
              </label>
            </Grid.Column>
            <Grid.Column width={8}>
              <h5>Name:</h5>
              <Input
                fluid
                placeholder='Search...'
                onChange={(e) => this.handleChange(e)}
                value={this.state.name}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
        <Segment
          raised
          style={{
            minHeight: '70vh',
            borderRadius: '20px',
          }}
        >
          <h5 style={{ fontWeight: 'bold' }}>กลุ่มสำหรับ</h5>
          <Card.Group itemsPerRow={2}>
            <Card onClick={this.handleItemClick} name='dinner'>
              <Image src='https://picsum.photos/200/150' wrapped ui={false} />
              <Card.Content
                style={{
                  backgroundColor: activeItem == 'dinner' ? 'seagreen' : null,
                }}
              >
                <Card.Header>ดิเนอร์</Card.Header>
              </Card.Content>
            </Card>
            <Card onClick={this.handleItemClick} name='tour'>
              <Image src='https://picsum.photos/200/150' wrapped ui={false} />
              <Card.Content
                style={{
                  backgroundColor: activeItem == 'tour' ? 'seagreen' : null,
                }}
              >
                <Card.Header>ท่องเที่ยว</Card.Header>
              </Card.Content>
            </Card>
            <Card onClick={this.handleItemClick} name='bar'>
              <Image src='https://picsum.photos/200/150' wrapped ui={false} />
              <Card.Content
                style={{
                  backgroundColor: activeItem == 'bar' ? 'seagreen' : null,
                }}
              >
                <Card.Header>บาร์</Card.Header>
              </Card.Content>
            </Card>
            <Card onClick={this.handleItemClick} name='shop'>
              <Image src='https://picsum.photos/200/150' wrapped ui={false} />
              <Card.Content
                style={{
                  backgroundColor: activeItem == 'shop' ? 'seagreen' : null,
                }}
              >
                <Card.Header>ช้อปปิ้ง</Card.Header>
              </Card.Content>
            </Card>
          </Card.Group>
          <Button
            positive
            floated='right'
            style={{ marginTop: '5%' }}
            disabled={!imagePreviewUrl || !activeItem || !name}
            onClick={e => this.sendstateback(e)}
          >
            ต่อไป
          </Button>
        </Segment>
        </>
    );
  }
}

export default Step1;
