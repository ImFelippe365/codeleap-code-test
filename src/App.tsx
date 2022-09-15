import { useEffect, useState } from 'react';

// Components
import { Heading } from './components/Heading/index';
import { Form } from './components/Form/index';
import { DeleteAlert } from './components/DeleteAlert';

// Style
import './styles/main.css'

// Icons
import deleteIcon from './assets/icons/delete-icon.svg'
import editIcon from './assets/icons/edit-icon.svg'
import { SignIn } from './components/SignIn';
import { useSelector } from 'react-redux';
import api from './services/api';
import timePast from './utils/timePast';
import { EditItemModal } from './components/EditItemModal';

interface PostProps {
  id: number,
  username: string,
  created_datetime: Date,
  title: string,
  content: string
}

export interface Posting {
  username?: string,
  title: string,
  content: string
}

function initialPosting() {
  return {
    username: '',
    title: '',
    content: ''
  }
}

export default function App() {

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [postId, setPostId] = useState<number>(0);

  const [posting, setPosting] = useState<Posting>(initialPosting);

  const [showEditingModal, setShowEditingModal] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const { username } = useSelector((state: any) => state);

  const handleConfirmDeletingItem = () => {
    api.delete(`/careers/${postId}/`)
      .then((response) => {
        console.log(response)
        closeDeleteAlert();
        getPosts();
      })
      .catch(error => console.log("getting posts error: ", error))
  }

  const handleUpdatePost = (modifiedPost: Posting) => {
    api.patch(`/careers/${postId}/`, modifiedPost)
      .then(response => {
        console.log(response);
        closeEditingModal();
        getPosts();
      })
      .catch(error => console.log("patching error: ", error))
  }

  const handleCreatePost = () => {
    api.post('/careers/', {
      ...posting,
      username: username,
    })
      .then(response => console.log(response))
      .catch(error => console.log("posting error: ", error))
  }

  const onChangePostingFields = (name: string, value: string) => {
    setPosting(post => {
      return {
        ...post,
        [name]: value
      }
    })
  }

  const openEditingModal = (id: number) => {
    // window.scrollTo(0, 0);
    setPostId(id);
    setShowEditingModal(true);
  }

  const closeEditingModal = () => {
    setShowEditingModal(false);
  }

  const openDeleteAlert = (id: number) => {
    // window.scrollTo(0, 0);
    setPostId(id);
    setShowDeleteAlert(true);
  }

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
  }

  const getPosts = () => {
    api.get('/careers/')
      .then(({ data }) => {
        let sortedData = data.results;
        sortedData.sort((postA: PostProps, postB: PostProps) => {
          return (new Date(postA.created_datetime).getTime() > new Date(postB.created_datetime).getTime())
        })
        setPosts(sortedData);
      })
      .catch(error => console.log("getting posts error: ", error))
  }

  useEffect(() => {
    getPosts();
  }, [])

  if (!username) return <SignIn />
  return (
    <main className='relative'>
      {
        showDeleteAlert &&
        <DeleteAlert
          onConfirm={handleConfirmDeletingItem}
          onCancel={closeDeleteAlert}
        />
      }
      {
        showEditingModal &&
        <EditItemModal
          id={postId}
          handleUpdatePost={handleUpdatePost}
          closeEditingModal={closeEditingModal}
        />
      }
      <div className="m-auto bg-white w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%]">
        <Heading title='CodeLeap Network' />

        <div className='px-9 py-11'>
          <div className='border-solid border-middle-gray border-[1px] px-7 py-6 mb-9'>
            <h2 className='font-bold text-xl mb-6'>What's on your mind?</h2>

            <Form
              values={posting}
              onChangeField={onChangePostingFields}
              submitPost={handleCreatePost}
              buttonText='CREATE'
            />
          </div>

          {
            posts?.map(post => {
              const { time, type } = timePast(post.created_datetime);

              return (
                <div key={post.id} className='mb-11'>
                  <Heading title={post.title}>
                    {
                      post.username === username &&
                      <div className='flex flex-row items-center gap-6'>
                        <img onClick={() => openDeleteAlert(post.id)} className='w-[22px]' role={"button"} src={deleteIcon} />
                        <img onClick={() => openEditingModal(post.id)} className='w-[30px]' role={"button"} src={editIcon} />
                      </div>
                    }
                  </Heading>
                  <div className='border-solid border-middle-gray border-[1px] px-7 py-6'>
                    <div className='flex flex-row justify-between items-center'>
                      <h3 className='text-gray text-[18px] font-bold'>@{post.username}</h3>
                      <label className='text-gray text-[18px]'>
                        {type === "just now" ? '' : time} {time > 1 ? type + "s" : type} {type === "just now" ? '' : 'ago'}
                      </label>
                    </div>
                    <p className='text-black text-[18px] mt-4'>
                      {post.content}
                    </p>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </main>
  )
}

