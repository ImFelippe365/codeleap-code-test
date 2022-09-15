import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import { Heading } from './components/Heading/index';
import { Form } from './components/Form/index';
import { DeleteAlert } from './components/DeleteAlert';
import { EditItemModal } from './components/EditItemModal';
import { SignIn } from './components/SignIn';

// Style
import './styles/main.css'

// Icons
import deleteIcon from './assets/icons/delete-icon.svg'
import editIcon from './assets/icons/edit-icon.svg'

// Utils
import api from './services/api';
import timePast from './utils/timePast';

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

  const handleDisableScroll = () => {
    let topScroll = window.pageYOffset || document.documentElement.scrollTop;
    let leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = () => {
      window.scrollTo(leftScroll, topScroll);
    };
  }

  const handleActivateScroll = () => {
    window.onscroll = () => { }
  }

  const handleConfirmDeletingItem = () => {
    api.delete(`/careers/${postId}/`)
      .then((response) => {
        closeDeleteAlert();
        getPosts();
      })
  }

  const handleUpdatePost = (modifiedPost: Posting) => {
    api.patch(`/careers/${postId}/`, modifiedPost)
      .then(response => {
        closeEditingModal();
        getPosts();
      })
  }

  const handleCreatePost = (posting: Posting) => {
    api.post('/careers/', {
      ...posting,
      username: username,
    })
      .then(response => {
        getPosts()
        setPosting(initialPosting);
      })
  }

  const onChangePostingFields = (name: string, value: string) => {
    setPosting(post => {
      return {
        ...post,
        [name]: value
      }
    })
  }

  const openEditingModal = (post: PostProps) => {
    handleDisableScroll();
    setPosting(post);
    setPostId(post.id);
    setShowEditingModal(true);
  }

  const closeEditingModal = () => {
    handleActivateScroll();
    setPosting(initialPosting);
    setShowEditingModal(false);
  }

  const openDeleteAlert = (id: number) => {
    handleDisableScroll()
    setPostId(id);
    setShowDeleteAlert(true);
  }

  const closeDeleteAlert = () => {
    handleActivateScroll();
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
  }

  useEffect(() => {
    return getPosts();
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
          initialModifiedPost={posting}
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
              showDefaultValue={false}
              onChangeField={onChangePostingFields}
              submitPost={() => handleCreatePost(posting)}
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
                        <img onClick={() => openEditingModal(post)} className='w-[30px]' role={"button"} src={editIcon} />
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

